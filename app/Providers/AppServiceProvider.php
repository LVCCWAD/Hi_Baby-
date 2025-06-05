<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        Inertia::share([
            'cartCount' => fn() => count(session('cart', []))
        ]);

        Inertia::share([
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
        ]);

        Inertia::share([
            'notifications' => function () {
                if ($user = Auth::user()) {
                    return $user->notifications()
                        ->orderBy('created_at', 'desc')
                        ->limit(10)
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
                }
                return [];
            }
        ]);
    }

    protected $listen = [
        \App\Events\UserAddedToCart::class => [
            \App\Listeners\SendUserNotification::class,
        ],
        \App\Events\UserPurchased::class => [
            \App\Listeners\SendUserNotification::class,
        ],
    ];
}
