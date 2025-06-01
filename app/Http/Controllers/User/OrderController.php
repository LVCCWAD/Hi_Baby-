<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Mail\OrderPlaced;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;


class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        $request->validate([
            'address' => 'required|string|min:10'
        ]);

        $user = Auth::user();
        $cartItems = $user->carts()->with(['product', 'color', 'size'])->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Your cart is empty');
        }

        foreach ($cartItems as $item) {
            if (!$item->product || !$item->color || !$item->size) {
                return back()->with('error', 'Invalid product configuration');
            }
        }

        $totalAmount = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        try {
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'address' => $request->address,
                'payment_status' => 'pending'
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'color_id' => $item->color_id,
                    'size_id' => $item->size_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price
                ]);
            }

            // Clear the cart
            $user->carts()->delete();

            // 🔁 Load items and relationships for email
            $order->load('items.product', 'items.color', 'items.size', 'user');

            // ✅ Send order confirmation email
            Mail::to($user->email)->send(new OrderPlaced($order));

            return redirect()->route('user.orders')->with('success', 'Order placed successfully');
        } catch (\Exception $e) {
            \Log::error('Order creation error: ' . $e->getMessage());
            return back()->with('error', 'Failed to create order. Please try again.');
        }
    }



    public function showUserOrders()
    {
        $orders = Auth::user()->orders()->with(['orderItems.product', 'orderItems.color', 'orderItems.size'])->get();

        // For users
        return Inertia::render('User/Orders', [
            'orders' => $orders,
            'role' => "user",
        ]);

        // // For admins
        // return Inertia::render('Admin/Orders', [
        //     'orders' => $orders,
        //     'role' => "admin",
        // ]);
    }


    public function showUserOrdersToAdmin()
    {
        if (Auth::user()->role === 'admin') {
            // Admin sees all orders
            $orders = Order::with(['user', 'orderItems.product', 'orderItems.color', 'orderItems.size'])
                ->latest()
                ->get();
        } else {
            // User sees only their own orders
            $orders = Order::with(['orderItems.product', 'orderItems.color', 'orderItems.size'])
                ->where('user_id', Auth::id())
                ->latest()
                ->get();
        }

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'role' => Auth::user()->role,
        ]);
    }



    public function placeOrder(Request $request)
    {

        \Log::info('Place order request data: ', $request->all());
        $request->validate([
            'address' => 'required|string|min:10',
            'product_id' => 'required|exists:products,id',
            'color_id' => 'required|exists:colors,id',
            'size_id' => 'required|exists:sizes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        // Fetch the product to get price and check existence
        $product = Product::find($request->product_id);
        if (!$product) {
            return back()->with('error', 'Product not found.');
        }

        $totalAmount = $product->price * $request->quantity;

        try {
            // Create order with provided address and total
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'address' => $request->address,
                'payment_status' => 'pending',
            ]);

            // Create one order item for the single product
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'color_id' => $request->color_id,
                'size_id' => $request->size_id,
                'quantity' => $request->quantity,
                'price' => $product->price,
            ]);

            // Send order confirmation email
            $order->load('items.product', 'items.color', 'items.size', 'user');
            Mail::to($user->email)->send(new OrderPlaced($order));

            // Return Inertia page with order info (or redirect as needed)
            return inertia('User/OrderSuccess', [
                'order_id' => $order->id,
                'order' => $order,
            ]);
        } catch (\Exception $e) {
            Log::error('Order creation error: ' . $e->getMessage());
            return back()->with('error', 'Failed to create order. Please try again.');
        }
    }


    public function showSuccess(Order $order)
    {
        // Optionally, check if the authenticated user owns this order
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        // Render a success page and pass order details if needed
        return Inertia::render('User/OrderSuccess', [
            'order_id' => $order->id,
            'order' => $order->load('items.product'),
        ]);
    }
    // public function checkout(Request $request)
    // {
    //     $cart = Auth::user()->carts()->with('product')->get();

    //     return Inertia::render('Checkout', [
    //         'cart' => $cart,
    //         'address' => Auth::user()->address,
    //     ]);
    // }
}
