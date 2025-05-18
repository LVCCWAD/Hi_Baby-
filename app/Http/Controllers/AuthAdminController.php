<?php

namespace App\Http\Controllers;

use Log;
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
    public function aboutUs()
    {
        return  Inertia::render('AboutUs');
    }


    public function loginPost(Request $request)
    {
        Log::info('Login POST received', $request->all());

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            \Log::info('User type check', ['role' => $user->role]);

            if ($user->role === 'admin') {
                \Log::info('Redirecting to admin dashboard');

                return redirect()->route('admin.dashboard');
            }

            if ($user->role === 'user') {
                return redirect()->route('user.home');
            }

            Auth::logout();
            return redirect()->route('login')->withErrors(['default' => 'Unauthorized access.']);
        }

        return redirect()->back()->withErrors(['default' => 'Invalid credentials']);
    }


    // public function logout()
    // {
    //     Auth::guard('admin')->logout();
    //     return redirect()->route('admin.login');
    // }

}
