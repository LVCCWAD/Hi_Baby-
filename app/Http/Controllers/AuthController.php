<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

        $user = \App\Models\User::where('email', $request->email)->first();

        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'No account found with this email.']);
        }

        if (!Hash::check($request->password, $user->password)) {
            return redirect()->back()->withErrors(['password' => 'Incorrect password.']);
        }

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            Log::info('User type check', ['role' => $user->role]);

            if ($user->role === 'admin') {
                Log::info('Redirecting to admin dashboard');
                return Inertia::location(route('admin.dashboard'));
            }

            if ($user->role === 'user') {
                return Inertia::location(route('user.home'));
            }

            Auth::logout();
            return redirect()->route('login')->withErrors(['default' => 'Unauthorized access.']);
        }

        return redirect()->back()->withErrors(['default' => 'Login failed. Please try again.']);
    }



    public function register()
    {
        return  Inertia::render('Register');
    }


    public function registerPost(Request $request)
    {
        try {
            // Validate the input
            $credentials = $request->validate([
                'username' => 'required|string|max:255',
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8',
            ]);

            // Check for existing username
            if (User::where('username', $request->username)->exists()) {
                return redirect()->back()->withErrors([
                    'username' => 'Username is already taken',
                ])->withInput($request->except('password'));
            }

            // Check for existing email
            if (User::where('email', $request->email)->exists()) {
                return redirect()->back()->withErrors([
                    'email' => 'Email is already made on this site',
                ])->withInput($request->except('password'));
            }

            // Hash the password
            $credentials['password'] = bcrypt($credentials['password']);

            // Create the user
            $user = User::create($credentials);

            // Login the user
            Auth::login($user);

            if (Auth::check()) {
                return Inertia::location(route('user.home'));
            }

            // Fallback in case login fails
            return redirect()->back()->withErrors([
                'default' => 'Login after registration failed. Please try again.',
            ]);
        } catch (\Exception $e) {
            \Log::error('Registration error: ' . $e->getMessage());

            return redirect()->back()->withErrors([
                'default' => 'Registration failed. Please try again later.'
            ])->withInput($request->except('password'));
        }
    }


    public function logout()
    {
        Session::flush();
        Auth::logout();
        return Inertia::location(route('login'));
    }
}
