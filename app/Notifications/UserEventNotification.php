<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;

class UserEventNotification extends Notification
{
    use Queueable;

    protected $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function via($notifiable)
    {
        return ['database']; // Store in DB so it's viewable later
    }

    public function toDatabase($notifiable)
    {
        return [
            'title' => 'Notification',
            'description' => $this->message,
        ];
    }




}
