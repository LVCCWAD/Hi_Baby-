<?php

use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthAdminController;

Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return inertia('LandingPage');
    });

    Route::get('/login', [AuthAdminController::class, 'login'])->name('login');
    Route::post('/login', [AuthAdminController::class, 'loginPost'])->name('loginPost');
    Route::get('/register', [UserController::class, 'register'])->name('register');
    Route::post('/register', [UserController::class, 'registerPost'])->name('registerPost');
});


    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/messages', [AdminController::class, 'messages'])->name('admin.messages');
        Route::get('/orders', [AdminController::class, 'orders'])->name('admin.orders');


        Route::get('/add-product', [ProductController::class, 'create'])->name('admin.add-product');
        Route::post('/add-product', [ProductController::class, 'store'])->name('admin.add-product.store');
        Route::get('/show-products', [ProductController::class, 'show'])->name('admin.products');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
        Route::post('/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
        Route::delete('/products/{product}', [ProductController::class, 'delete'])->name('products.delete');

        // Route::post
    });

    Route::middleware(['auth'])->group(function () {

        Route::get('/home', [ProductController::class, 'index'])->name('user.home');
    });

    Route::post('/logout', function(){
        Auth::logout();
    });
