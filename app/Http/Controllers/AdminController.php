<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AdminController extends Controller
{

    public function dashboard()
    {
        return  Inertia::render('Admin/Dashboard');
    }

    public function products()
    {
        return  Inertia::render('Admin/Products');
    }

    public function messages()
    {
        return  Inertia::render('Admin/Messages');
    }

    public function orders()
    {
        return  Inertia::render('Admin/Orders');
    }


}
