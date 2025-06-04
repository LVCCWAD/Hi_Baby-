<?php

namespace App\Listeners;

use App\Models\User;
use App\Events\UserPurchased;
use App\Events\UserAddedToCart;
use App\Events\UserActionOccurred;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendUserNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserActionOccurred $event)
    {
        $user = User::find($event->userId);
        if ($event instanceof UserAddedToCart) {
            $message = "You added {$event->productName} to your cart.";
            // You can send notification here, e.g. $user->notify(new SomeNotification($message));
        }  elseif ($event instanceof UserPurchased) {
            $message = "Thank you for your purchase!";
            // You can send notification here, e.g. $user->notify(new SomeNotification($message));
        }
    }
}

