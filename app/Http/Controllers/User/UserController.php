<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function login()
    {
        return  Inertia::render('Login');
    }


    public function aboutUs()
    {
        return  Inertia::render('AboutUs');
    }


    public function home()
    {
        return  Inertia::render('User/Home');
    }


    public function profileView()
    {

        return Inertia::render('User/ProfileView', ['user' => Auth::user(),]);
    }


    public function profileEdit()
    {
        $user = Auth::user();


        return Inertia::render('User/ProfileEdit', [
            'user' => $user->only([
                'id',
                'username',
                'first_name',
                'last_name',
                'email',
                'role',
                'address_id',
                'phone_number',
                'picture',
            ]),
        ]);
    }

    // Handle the update request
    public function profileUpdate(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'username'      => 'required|string|max:255|unique:users,username,' . $user->id,
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'email'         => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone_number'  => 'nullable|string|max:20',
            'role'          => 'required|string',
            'address_id'    => 'nullable|integer',
            'picture'       => 'nullable|url',
            'password'      => 'nullable|confirmed|min:6',
        ]);

        // Remove password if not being updated
        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('user.profile')->with('success', 'Profile updated successfully!');
    }



    // public function chats()
    // {
    //     $userId = Auth::id();

    //     $messages = Chat::with(['sender', 'receiver'])
    //         ->where('sender_id', $userId)
    //         ->orWhere('receiver_id', $userId)
    //         ->orderBy('created_at', 'asc')
    //         ->get();

    //     return Inertia::render('User/UserChat', [
    //         'messages' => $messages,
    //         'authUserId' => $userId,
    //     ]);
    // }

    // public function logout()
    // {
    //     Session::flush();
    //     Auth::logout();
    //     return redirect('/login')->with('success', 'You are logged out!');
    // }
}
