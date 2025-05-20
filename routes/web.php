<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatsController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\LikeController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\User\AddressController;
use App\Http\Controllers\User\ReviewsController;
use App\Http\Controllers\Admin\ProductController;



Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return inertia('LandingPage');
    });

    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'loginPost'])->name('loginPost');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'registerPost'])->name('registerPost');
});

Route::get('/aboutus', [UserController::class, 'aboutus'])->name('aboutus');


Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    // Route::get('/messages', [AdminController::class, 'messages'])->name('admin.messages');
    Route::get('/order/list', [OrderController::class, 'show'])->name('admin.orders');


    Route::get('/add-product', [ProductController::class, 'create'])->name('admin.add-product');
    Route::post('/add-product', [ProductController::class, 'store'])->name('admin.add-product.store');
    Route::get('/show-products', [ProductController::class, 'show'])->name('admin.products');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::post('/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/products/{product}', [ProductController::class, 'delete'])->name('products.delete');

    //Messages

    Route::get('/admin/chat', [ChatsController::class, 'index'])->name('admin.chat.index'); // admin landing on chat page
    Route::get('/admin/chat/{userId}', [ChatsController::class, 'adminChat'])->name('admin.chat'); // admin chat with specific user
    Route::post('/admin/chat/send', [ChatsController::class, 'adminSendMessage'])->name('admin.chat.send'); // admin sends message

    // Route::get('/admin/fetch-messages', [ChatsController::class, 'fetchMessages'])->name('admin.fetchMessages');
    // Route::post('/admin/send-message', [ChatsController::class, 'sendMessage'])->name('admin.sendMessage');


});

Route::middleware(['auth'])->group(function () {

    Route::get('/home', [ProductController::class, 'index'])->name('user.home');
    Route::get('/girls-products', [ProductController::class, 'showGirlsProducts'])->name('user.girls');
    Route::get('/boys-products', [ProductController::class, 'showBoysProducts'])->name('user.boys');

    Route::get('/user/products/{product}', [ProductController::class, 'productDetail'])->name('user.products.show');

    //Cart
    Route::get('/cart', [CartController::class, 'cart'])->name('user.cart');
    Route::post('/cart/add', [CartController::class, 'addToCart'])->name('user.cart.add');
    Route::delete('/cart/{product}', [CartController::class, 'remove'])->name('user.cart.remove');

    //Orders
    Route::post('/order/create', [OrderController::class, 'createOrder'])->name('order.create'); // create order
    Route::get('/orders', [OrderController::class, 'orders'])->name('user.orders');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show'); // show single order detail

    //User Profile
    Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');
    Route::get('/profile/edit', [UserController::class, 'profileEdit'])->name('user.profile.edit');
    Route::post('/profile/update', [UserController::class, 'profileUpdate'])->name('user.profile.update');

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
    // Review
    Route::post('/user/products/{product}/reviews', [ReviewsController::class, 'store'])->name('reviews.store');
    Route::put('/user/products/{product}/reviews/{review}', [ReviewsController::class, 'update'])->name('reviews.update');
    Route::delete('/user/products/{product}/reviews/{review}', [ReviewsController::class, 'destroy'])->name('reviews.destroy');

    //Like Products
    Route::get('/home', [LikeController::class, 'home'])->name('home');
    Route::get('/girls-products', [LikeController::class, 'girls'])->name('girls.products');
    Route::get('/boys-products', [LikeController::class, 'boys'])->name('boys.products');
    Route::post('/products/{product}/like', [LikeController::class, 'like'])->name('products.like');

    //Messages
    Route::get('/chat', [ChatsController::class, 'index'])->name('chat.index'); // user chatting with admin
    Route::post('/chat/send', [ChatsController::class, 'sendMessageFromUserToAdmin'])->name('chat.send');
});

Route::post('/logout', function () {
    Auth::logout();
});
