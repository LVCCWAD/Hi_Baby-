<?php

namespace App\Http\Controllers\User;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Notifications\UserEventNotification;

class CartController extends Controller
{
    public function cart()
    {
        $cartItems = Auth::user()->carts()->with('product')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->product->name,
                'image' => $item->product->image,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
                'color' => $item->color->name,
                'size' => $item->size->name
            ];
        });

        $address = Auth::user()->address;

        return Inertia::render('User/Cart', [
            'cart' => $cartItems,
            'address' => $address,
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:products,id',
            'color' => 'required|exists:colors,id',
            'size' => 'required|exists:sizes,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::user();
        $itemId = $request->input('id');

        $existingCartItem = $user->carts()
            ->where('product_id', $itemId)
            ->where('color_id', $request->input('color'))
            ->where('size_id', $request->input('size'))
            ->first();

        if ($existingCartItem) {
            $existingCartItem->update([
                'quantity' => $existingCartItem->quantity + $request->input('quantity', 1)
            ]);
        } else {
            $user->carts()->create([
                'product_id' => $itemId,
                'color_id' => $request->input('color'),
                'size_id' => $request->input('size'),
                'quantity' => $request->input('quantity', 1)
            ]);
        }
        $user->notify(new UserEventNotification("Product #{$itemId} added to your cart", 'Cart Update'));

        $cartCount = $user->carts()->count();
        session()->flash('cartCount', $cartCount);
        return Inertia::location(route('user.cart'));
    }

    public function remove($id)
    {
        $cartItem = Cart::find($id);

        if (!$cartItem) {
            return redirect()->back()->with('error', 'Item not found.');
        }

        if ($cartItem->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Unauthorized action.');
        }

        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart.');
    }

    public function updateQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::find($id);

        if (!$cartItem) {
            return back()->with('error', 'Item not found.');
        }

        if ($cartItem->user_id !== Auth::id()) {
            return back()->with('error', 'Unauthorized action.');
        }

        $cartItem->update([
            'quantity' => $request->input('quantity'),
        ]);

        return back()->with('success', 'Cart quantity updated.');
    }
}
