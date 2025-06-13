<?php

namespace App\Http\Controllers\User;

use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function login()
    {
        return  Inertia::render('Login');
    }


    public function aboutUs()
    {
        return  Inertia::render('AboutUs');
    }


    public function home()
    {
        return  Inertia::render('User/Home');
    }


    public function profileView()
    {
        $user = Auth::user();

        // Get liked products by this user
        $likedProducts = Product::whereHas('likes', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->with('reviews') // optional, load relations you need
            ->get();

        return Inertia::render('User/ProfileView', [
            'user' => $user,
            'likedProducts' => $likedProducts,
        ]);
    }

    public function profileEdit()
    {
        $user = Auth::user();


        return Inertia::render('User/ProfileEdit', [
            'user' => $user->only([
                'id',
                'username',
                'first_name',
                'last_name',
                'email',
                'role',
                'address_id',
                'phone_number',
                'picture',
            ]),
        ]);
    }

    // Handle the update request
    public function profileUpdate(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'username'      => 'required|string|max:255|unique:users,username,' . $user->id,
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'email'         => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone_number'  => 'nullable|string|max:20',
            'address_id'    => 'nullable|integer',
            'picture'       => 'nullable|image|max:2048',
            'password'      => 'nullable|confirmed|min:6',
            'current_password' => [
                'required_with:password',
                function ($attribute, $value, $fail) use ($request, $user) {
                    if ($request->filled('password') && !Hash::check($value, $user->password)) {
                        $fail('Current password is incorrect.');
                    }
                }
            ],
        ]);

        // Handle picture upload with file replacement
        if ($request->hasFile('picture')) {
            if ($user->picture && Storage::disk('public')->exists(str_replace('/storage/', '', $user->picture))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->picture));
            }

            $file = $request->file('picture');
            $fileName = time() . '.' . $file->getClientOriginalExtension();

            $file->move(public_path('storage/profile_pictures'), $fileName);

            $validated['picture'] = 'profile_pictures/' . $fileName;
        } else {
            $validated['picture'] = $user->picture;
        }

        // If password is blank, remove it from $validated so it's not updated
        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $user->update($validated);

        return back()->with('success', 'Profile updated successfully!');
    }



    public function showNotifications(Request $request)
    {
        $user = $request->user();

        // Get user notifications, order by newest first
        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'title' => $notification->data['title'] ?? 'Notification',
                    'description' => $notification->data['description'] ?? '',
                    'time' => $notification->created_at->diffForHumans(),
                    'read_at' => $notification->read_at,
                ];
            });



        return Inertia::render('User/Notifications', [
            'notifications' => $notifications,
            'unreadCount' => $user->unreadNotifications()->count(),
        ]);
    }

    public function markAllRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return redirect()->back()->with('success', 'All notifications marked as read.');
    }

    public function showOrdersToProfileView()
    {
        $user = Auth::user();

        // Load orders
        $orders = Order::with(['orderItems.product', 'orderItems.color', 'orderItems.size'])
            ->where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at->toDateTimeString(),
                    'items' => $order->orderItems->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'price' => $item->price,
                            'quantity' => $item->quantity,
                            'product_name' => $item->product->name ?? 'Unnamed Product',
                            'image' => $item->product->image ?? null,
                            'color' => $item->color->name ?? null,
                            'size' => $item->size->name ?? null,
                        ];
                    }),
                ];
            });

        // Load liked products correctly
        $likedProducts = Product::whereHas('likes', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->with('reviews')
            ->get();

        return Inertia::render('User/ProfileView', [
            'user' => $user,
            'likedProducts' => $likedProducts,
            'orders' => $orders,
            'ordersCount' => $orders->count(),
        ]);
    }


    // public function userChats()
    // {
    //     $userId = Auth::id();

    //     $messages = Chat::with(['sender', 'receiver'])
    //         ->where('sender_id', $userId)
    //         ->orWhere('receiver_id', $userId)
    //         ->orderBy('created_at', 'asc')
    //         ->get();

    //     return Inertia::render('User/UserChat', [
    //         'messages' => $messages,
    //         'authUserId' => $userId,
    //     ]);
    // }

    // public function logout()
    // {
    //     Session::flush();
    //     Auth::logout();
    //     return redirect('/login')->with('success', 'You are logged out!');
    // }
}
