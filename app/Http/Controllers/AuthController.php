<?php

namespace App\Http\Controllers;

use Log;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login()
    {
        return  Inertia::render('Login');
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

    public function register()
    {
        return  Inertia::render('Register');
    }

    public function registerPost(Request $request)
    {
        try {
            $credentials = $request->validate([
                'username' => 'required|string|max:255',
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8',

            ]);

            $credentials['password'] = bcrypt($credentials['password']);
            $user = User::create($credentials);
            Auth::login($user);

            if (Auth::check()) {
                return redirect()->intended('home')->with('success', 'You are logged in!');
            }

            return back()->withErrors([
                'email' => 'The provided email do not match our records.',
                'password' => 'The provided password do not match our records.',
            ]);
        } catch (\Exception $e) {
            // debugging
            dd("Error while saving user data: " . $e->getMessage());
        }
    }


    // public function logout()
    // {
    //     Session::flush();
    //     Auth::logout();
    //     return redirect('/login')->with('success', 'You are logged out!');
    // }
}
