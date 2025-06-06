<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Address;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{


    public function showCheckout(Product $product)
    {
        $address = Auth::user()->address;

        return Inertia::render('User/Checkout', [
            'product' => $product,
            'address' => $address ? [
                'street' => $address->street,
                'barangay' => $address->barangay,
                'city' => $address->city,
                'province' => $address->province,
                'zip_code' => $address->zip_code,
                'country' => $address->country,
            ] : null,
        ]);
    }



    // public function showProductDetail(Product $product)
    // {
    //     $product = Product::with(['colors', 'sizes'])->findOrFail($product->id);

    //     $user = Auth::user()->load('address');

    //     // Log the structure of the user's address
    //     if ($user->address) {
    //         \Log::info('Address structure:', $user->address->toArray());
    //     } else {
    //         \Log::info('No address found for user ID: ' . $user->id);
    //     }

    //     return Inertia::render('User/ProductDetail', [
    //         'product' => $product,
    //         'auth' => [
    //             'user' => $user,
    //         ],
    //         'address' => $user->address,
    //     ]);
    // }






    public function storeAddress(Request $request)
    {
        $request->validate([
            'street' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'zip_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
        ]);

        $address = Auth::user()->address()->create([
            'street' => $request->street,
            'barangay' => $request->barangay,
            'city' => $request->city,
            'province' => $request->province,
            'zip_code' => $request->zip_code,
            'country' => $request->country,
        ]);

        return Inertia::location(route('user.cart', ['selectedAddress' => $address]));
    }



    public function updateAddress(Request $request, Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'street' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'zip_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
        ]);

        $address->update([
            'street' => $request->street,
            'barangay' => $request->barangay,
            'city' => $request->city,
            'province' => $request->province,
            'zip_code' => $request->zip_code,
            'country' => $request->country,
        ]);

        return redirect()->back()->with('success', 'Address updated successfully');
    }
}
