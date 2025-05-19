<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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

        // Check product availability
        foreach ($cartItems as $item) {
            if (!$item->product) {
                return back()->with('error', 'One or more products are no longer available');
            }

            // Add additional validation as needed (e.g., check if color and size are still valid)
            if (!$item->color || !$item->size) {
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
            // dd($order);


            // Clear the cart after creating the order
            $user->carts()->delete();


            return redirect()->route('user.orders')->with('success', 'Order placed successfully');
        } catch (\Exception $e) {
            \Log::error('Order creation error: ' . $e->getMessage());
            return back()->with('error', 'Failed to create order. Please try again.');
        }
    }

    // App\Http\Controllers\User\OrderController.php

    public function orders()
    {
        $orders = Auth::user()->orders()->with(['orderItems.product', 'orderItems.color', 'orderItems.size'])->get();

        // For users
        return Inertia::render('User/Orders', [
            'orders' => $orders,
            'role' => "user",
        ]);

        // For admins
        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'role' => "admin",
        ]);
    }


    public function show()
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
}
