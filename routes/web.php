<?php

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Mail\OrderPlaced;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Services\ProductSearchService;
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


// Health Check Route
Route::get('/', fn() => 'Laravel app is responding!');

// Public routes for guest
Route::middleware(['guest'])->group(function () {
    Route::get('/', fn() => inertia('LandingPage'));
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'loginPost'])->name('loginPost');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'registerPost'])->name('registerPost');
});

// About Us (public)
Route::get('/aboutus', [UserController::class, 'aboutus'])->name('aboutus');

// Admin routes
Route::middleware(['auth', 'admin'])->group(function () {

    // Dashboard & Orders
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/order/list', [OrderController::class, 'showUserOrdersToAdmin'])->name('admin.orders');

    // Products
    Route::get('/add-product', [ProductController::class, 'createProduct'])->name('admin.add-product');
    Route::post('/add-product', [ProductController::class, 'storeCreatedProduct'])->name('admin.add-product.store');
    Route::get('/show-products', [ProductController::class, 'showProductsToAdmin'])->name('admin.products');
    Route::get('/products/{product}/edit', [ProductController::class, 'editProduct'])->name('admin.products.edit');
    Route::post('/products/{product}', [ProductController::class, 'updateProduct'])->name('admin.products.update');
    Route::delete('/products/{product}', [ProductController::class, 'deleteProduct'])->name('products.delete');

    // Admin Chat Routes
    Route::get('/admin/chat', [ChatsController::class, 'showChatstoAdminAndUser'])->name('admin.chat.index');
    Route::get('/admin/chat/{userId}', [ChatsController::class, 'adminChat'])->name('admin.chat');
    Route::post('/admin/chat/send', [ChatsController::class, 'adminSendMessage'])->name('admin.chat.send');


    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// Authenticated User routes
Route::middleware(['auth'])->group(function () {

    // Product browsing
    Route::get('/home', [ProductController::class, 'showProductsToUserHome'])->name('user.home');
    Route::get('/girls-products', [ProductController::class, 'showGirlsProducts'])->name('user.girls');
    Route::get('/boys-products', [ProductController::class, 'showBoysProducts'])->name('user.boys');
    Route::get('/user/products/{product}', [ProductController::class, 'productDetail'])->name('user.products.show');

    // Cart
    Route::get('/cart', [CartController::class, 'cart'])->name('user.cart');
    Route::post('/cart/add', [CartController::class, 'addToCart'])->name('user.cart.add');
    Route::delete('/cart/{product}', [CartController::class, 'remove'])->name('user.cart.remove');
    Route::put('/cart/{id}', [CartController::class, 'updateQuantity']);


    // Orders
    Route::post('/order/create', [OrderController::class, 'createOrder'])->name('order.create');
    Route::get('/orders', [OrderController::class, 'showUserOrders'])->name('user.orders');
    Route::post('/order-checkout', [OrderController::class, 'placeOrder'])->name('orders.store');
    Route::get('/order-success/{order}', [OrderController::class, 'showSuccess'])->name('order.success');
    Route::get('/checkout-confirmation', [OrderController::class, 'checkoutConfirmation']);

    // User Profile
    Route::get('/profile', [UserController::class, 'profileView'])->name('user.profile');
    Route::get('/profile/edit', [UserController::class, 'profileEdit'])->name('user.profile.edit');
    Route::post('/profile/update', [UserController::class, 'profileUpdate'])->name('user.profile.update');
    // Route::get('/profile/orders', [UserController::class, 'showOrdersToProfileView'])->name('profile.orders');
    Route::get('/profile', [UserController::class, 'showOrdersToProfileView'])->name('user.profile');



    // Addresses
    Route::post('/addresses', [AddressController::class, 'storeAddress'])->name('user.addresses.store');
    Route::get('/addresses', [AddressController::class, 'showAddressToCart'])->name('user.addresses.show');
    Route::put('/addresses/{address}', [AddressController::class, 'updateAddress'])->name('user.addresses.update');

    // Reviews
    Route::get('/user/products/{product}/reviews', [ReviewsController::class, 'showReviews'])->name('products.show');
    Route::post('/user/products/{product}/reviews', [ReviewsController::class, 'storeReviews'])->name('reviews.store');
    Route::put('/user/products/{product}/reviews/{review}', [ReviewsController::class, 'updateReview'])->name('reviews.update');
    Route::delete('/user/products/{product}/reviews/{review}', [ReviewsController::class, 'destroyReview'])->name('reviews.destroy');

    // Collections
    Route::get('/collection/boys/{category?}', [ProductController::class, 'boysCollection'])->name('collection.boys');

    // Likes
    Route::get('/girls-products', [LikeController::class, 'likedProductsInGirls'])->name('girls.products');
    Route::get('/boys-products', [LikeController::class, 'likedProductsInBoys'])->name('boys.products');
    Route::post('/products/{product}/like', [LikeController::class, 'likeChecker'])->name('products.like');
    Route::post('/products/{product}/unlike', [ProductController::class, 'unlike']);

    // Chat Routes for Users
    Route::get('/chat', [ChatsController::class, 'showChatstoAdminAndUser'])->name('chat.index');
    Route::post('/chat/send', [ChatsController::class, 'send'])->name('chat.send');

    // Search
    Route::get('/search', [ProductController::class, 'searchResultsPage'])->name('user.search');

    // Logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
