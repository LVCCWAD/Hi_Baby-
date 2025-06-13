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
        try {
            $validated = $request->validate([
                'address' => 'required|string|min:10',
                'product_id' => 'required|exists:products,id',
                'color_id' => 'required|exists:colors,id',
                'size_id' => 'required|exists:sizes,id',
                'quantity' => 'required|integer|min:1',
                'payment_method' => 'required|string|in:cod',
            ]);

            $user = Auth::user();
            $product = Product::findOrFail($validated['product_id']);

            $totalAmount = $product->price * $validated['quantity'];

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'address' => $validated['address'],
                'payment_status' => 'pending',
                'payment_method' => $validated['payment_method'],
            ]);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'color_id' => $validated['color_id'],
                'size_id' => $validated['size_id'],
                'quantity' => $validated['quantity'],
                'price' => $product->price,
                'total' => $totalAmount,
            ]);

            Mail::to($user->email)->send(new OrderPlaced($order));

            // 🚀 Inertia recommended way to redirect after post
            return redirect()->route('order.success', ['order' => $order->id]);
        } catch (\Throwable $e) {
            \Log::error('Order error: ' . $e->getMessage());
            return back()->withErrors([
                'default' => 'Something went wrong. Please try again later.',
            ]);
        }
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
