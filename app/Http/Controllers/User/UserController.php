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
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

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
        $user = Auth::user();

        // Get liked products by this user
        $likedProducts = Product::whereHas('likes', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->with('reviews') // optional, load relations you need
            ->get();

        return Inertia::render('User/ProfileView', [
            'user' => $user,
            'likedProducts' => $likedProducts,
        ]);
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
            'address_id'    => 'nullable|integer',
            'picture'       => 'nullable|image|max:2048',
            'password'      => 'nullable|confirmed|min:6',
            'current_password' => [
                'required_with:password',
                function ($attribute, $value, $fail) use ($request, $user) {
                    if ($request->filled('password') && !Hash::check($value, $user->password)) {
                        $fail('Current password is incorrect.');
                    }
                }
            ],
        ]);

        // Handle picture upload with file replacement
        if ($request->hasFile('picture')) {
            if ($user->picture && Storage::disk('public')->exists(str_replace('/storage/', '', $user->picture))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->picture));
            }

            $file = $request->file('picture');
            $fileName = time() . '.' . $file->getClientOriginalExtension();

            $file->move(public_path('storage/profile_pictures'), $fileName);

            $validated['picture'] = 'profile_pictures/' . $fileName;
        } else {
            $validated['picture'] = $user->picture;
        }

        // If password is blank, remove it from $validated so it's not updated
        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $user->update($validated);

        return back()->with('success', 'Profile updated successfully!');
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
