<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthAdminController extends Controller
{
    public function login()
    {
        return  Inertia::render('Login');
    }
    public function dashboard()
    {
        return  Inertia::render('Admin/Dashboard');
    }

    public function loginPost(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if ($user->user_type === 'admin') {
                return redirect()->route('admin.dashboard');
            }

            if ($user->user_type === 'user') {
                return redirect()->route('user.home');
            }

            Auth::logout();
            return redirect()->route('login')->with('error', 'Unauthorized access.');
        }

        return redirect()->back()->withErrors('Invalid credentials');
    }

    // public function logout()
    // {
    //     Auth::guard('admin')->logout();
    //     return redirect()->route('admin.login');
    // }

}
