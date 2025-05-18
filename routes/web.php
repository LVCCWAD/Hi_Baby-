<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthAdminController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\AddressController;
use App\Http\Controllers\User\ReviewsController;
use App\Http\Controllers\Admin\ProductController;



Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return inertia('LandingPage');
    });

    Route::get('/login', [AuthAdminController::class, 'login'])->name('login');
    Route::post('/login', [AuthAdminController::class, 'loginPost'])->name('loginPost');
    Route::get('/register', [UserController::class, 'register'])->name('register');
    Route::post('/register', [UserController::class, 'registerPost'])->name('registerPost');
});

Route::get('/aboutus', [AuthAdminController::class, 'aboutus'])->name('aboutus');

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
    Route::get('/girls-products', [ProductController::class, 'showGirlsProducts'])->name('user.home');
    Route::get('/user/products/{product}', [ProductController::class, 'productDetail'])->name('user.products.show');

    //Cart
    Route::get('/cart', [CartController::class, 'cart'])->name('user.cart');
    Route::post('/cart/add', [CartController::class, 'addToCart'])->name('user.cart.add');
    Route::delete('/cart/{product}', [CartController::class, 'remove'])->name('user.cart.remove');


    Route::post('/order/create', [OrderController::class, 'createOrder'])->name('order.create'); // create order
    Route::get('/orders', [OrderController::class, 'orders'])->name('user.orders');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show'); // show single order detail

    Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');
    Route::post('/profile', [UserController::class, 'updateProfile'])->name('user.profile.update');

    // Address routes

    Route::get('/addresses/latest', function () {
        $address = Auth::user()->addresses()->latest()->first();

        return Inertia::render('User/Cart', [
            'address' => $address,
        ]);
    });
    Route::post('/addresses', [AddressController::class, 'store'])->name('user.addresses.store');
    Route::get('/addresses/{address}', [AddressController::class, 'show'])->name('user.addresses.show');
    Route::put('/addresses/{address}', [AddressController::class, 'update'])->name('user.addresses.update');


    // Show product
    Route::get('/user/products/{product}', [ReviewsController::class, 'show'])->name('products.show');
    // Review routes
    Route::post('/user/products/{product}/reviews', [ReviewsController::class, 'store'])->name('reviews.store');
    Route::put('/user/products/{product}/reviews/{review}', [ReviewsController::class, 'update'])->name('reviews.update');
    Route::delete('/user/products/{product}/reviews/{review}', [ReviewsController::class, 'destroy'])->name('reviews.destroy');
});

Route::post('/logout', function () {
    Auth::logout();
});
