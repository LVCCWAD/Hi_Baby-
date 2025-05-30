<?php

namespace App\Mail;

use Inertia\Inertia;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderPlaced extends Mailable
{
    use Queueable, SerializesModels;

    public $order; // Order data

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->subject('Your Order Confirmation')
            ->view('emails.orders.placed')
            ->with([
                'order' => $this->order->load(['items.product', 'items.color', 'items.size']),
            ]);
    }
}
