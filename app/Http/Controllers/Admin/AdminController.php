<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use App\Models\Chat;


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


    public function orders()
    {
        return  Inertia::render('Admin/Orders');
    }




}
