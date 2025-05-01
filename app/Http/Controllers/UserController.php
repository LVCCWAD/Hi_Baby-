<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function login()
    {
        return  Inertia::render('Login');
    }

    public function register()
    {
        return  Inertia::render('Register');
    }


    public function home()
    {
        return  Inertia::render('User/Home');
    }

    public function loginPost(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('home')->with('success', 'You are logged in!');
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function registerPost(Request $request)
    {
        try {
            $credentials = request()->validate([
                'name' => 'required|string|max:255',
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
            // Dump the error message for debugging purposes
            dd($e->getMessage());
        }
    }

    public function logout()
    {
        Session::flush();
        Auth::logout();
        return redirect('/login')->with('success', 'You are logged out!');
    }
}
