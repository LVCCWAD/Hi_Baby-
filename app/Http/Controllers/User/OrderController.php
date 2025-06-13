<?php

namespace App\Http\Controllers\User;

use App\Models\Size;
use Inertia\Inertia;
use App\Models\Color;
use App\Models\Order;
use App\Models\Address;
use App\Models\Product;
use App\Mail\OrderPlaced;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Notifications\UserEventNotification;


class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        $request->validate([
            'address' => 'required|string|min:10',
            'items' => 'required|array',
            'items.*' => 'integer|exists:carts,id'
        ]);

        $user = Auth::user();

        // ✅ Only get selected items
        $cartItems = $user->carts()
            ->with(['product', 'color', 'size'])
            ->whereIn('id', $request->items)
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'No valid cart items selected');
        }

        foreach ($cartItems as $item) {
            if (!$item->product || !$item->color || !$item->size) {
                return back()->with('error', 'Invalid product configuration');
            }
        }

        $totalAmount = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);

        try {
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'address' => $request->address,
                'payment_status' => 'pending',
                'payment_method' => $request->payment_method,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'color_id' => $item->color_id,
                    'size_id' => $item->size_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                    'total' => $item->product->price * $item->quantity,
                    'payment_method' => $request->payment_method,
                ]);
            }

            // ✅ Only delete selected cart items
            $user->carts()->whereIn('id', $request->items)->delete();

            $order->load('items.product', 'items.color', 'items.size', 'user');

            Mail::to($user->email)->send(new OrderPlaced($order));
            $user->notify(new UserEventNotification('Order placed successfully.'));

            return Inertia::location(route('order.success', ['order' => $order->id]));
        } catch (\Exception $e) {
            Log::error('Order creation error: ' . $e->getMessage());
            return back()->with('error', 'Failed to create order. Please try again.');
        }
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
        Log::info('PlaceOrder Request:', $request->all());

        // Validation rules
        $rules = [
            'address' => 'required|string|min:10',
            'product_id' => 'required|exists:products,id',
            'color_id' => 'required|exists:colors,id',
            'size_id' => 'required|exists:sizes,id',
            'quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string|in:cod', // extend this list as needed
        ];

        // Validate request data
        if ($request->expectsJson()) {
            Validator::make($request->all(), $rules)->validate();
        } else {
            $request->validate($rules);
        }

        $user = Auth::user();
        $product = Product::find($request->product_id);

        $totalAmount = $product->price * $request->quantity;

        // Use payment method from request or default to 'cod'
        $paymentMethod = $request->input('payment_method', 'cod');

        // Create the order
        $order = Order::create([
            'user_id' => $user->id,
            'total_amount' => $totalAmount,
            'status' => 'pending',
            'address' => $request->address,
            'payment_status' => 'pending',
            'payment_method' => $paymentMethod,
        ]);

        // Create the order item
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'color_id' => $request->color_id,
            'size_id' => $request->size_id,
            'quantity' => $request->quantity,
            'price' => $product->price,
            'total' => $totalAmount,
        ]);

        // Send order confirmation email
        Mail::to($user->email)->send(new OrderPlaced($order));

        $user->notify(new UserEventNotification('Order placed successfully.'));

        // Redirect to order success page
        session()->flash('success', 'Order placed successfully!');
        return redirect()->route('order.success', ['order' => $order->id]);
    }



    public function showSuccess(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }
        $order->load('items.product', 'items.color', 'items.size');

        return Inertia::render('User/OrderSuccess', [
            'order' => $order->load('items.product', 'items.color', 'items.size', 'user'),
        ]);
    }


    public function checkoutConfirmation(Request $request)
    {
        $user = $request->user();

        $product = Product::with('colors', 'sizes')->findOrFail($request->input('product_id'));
        $address = $user->address;

        $colorId = $request->input('color_id');
        $sizeId = $request->input('size_id');

        $color = Color::find($colorId);
        $size = Size::find($sizeId);

        $initialData = [
            'quantity' => (int) $request->input('quantity', 1),
            'payment_method' => $request->input('payment_method', 'cod'),
            'color_id' => $colorId,
            'size_id' => $sizeId,
            'color_name' => $color?->name,
            'size_name' => $size?->name,
        ];

        return Inertia::render('User/Checkout', [
            'product' => $product,
            'address' => $address,
            'initialData' => $initialData,
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
