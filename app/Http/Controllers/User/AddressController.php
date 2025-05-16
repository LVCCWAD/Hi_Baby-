<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Address;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = Auth::user()->address()->get();

        return Inertia::render('User/Cart', [
            'addresses' => $addresses
        ]);
    }

    public function store(Request $request)
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

        return redirect()->route('user.cart')
            ->with('selectedAddress', $address);
    }


    // public function show(Address $address)
    // {
    //     if ($address->user_id !== Auth::id()) {
    //         abort(403);
    //     }

    //     return Inertia::render('User/Cart', [
    //         'address' => $address
    //     ]);
    // }

    public function update(Request $request, Address $address)
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
