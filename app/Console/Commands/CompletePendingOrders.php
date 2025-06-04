<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Log;


use App\Models\Order;
use Illuminate\Console\Command;

class CompletePendingOrders extends Command
{
    protected $signature = 'orders:complete';
    protected $description = 'Mark all shipped orders as delivered';

    public function handle(): void
    {
        Log::info('orders:status-update command ran at ' . now());

        // Update orders from pending to shipped
        $pendingUpdated = Order::where('status', 'pending')
            ->update(['status' => 'shipped']);

        // Update orders from shipped to delivered
        $shippedUpdated = Order::where('status', 'shipped')
            ->update(['status' => 'delivered']);

        $this->info("Updated {$pendingUpdated} orders from pending to shipped.");
        $this->info("Updated {$shippedUpdated} orders from shipped to delivered.");
    }
}
