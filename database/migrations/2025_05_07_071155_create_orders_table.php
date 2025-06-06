<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total_amount', 10, 2)->default(0);

            $table->enum('status', ['pending', 'shipped', 'delivered', 'cancelled'])
                  ->default('pending'); // ORDER status

            $table->string('address');

            $table->string('payment_method')->default('cod'); // PAYMENT method

            $table->enum('payment_status', ['pending', 'paid', 'failed'])
                  ->default('pending'); // PAYMENT status

            $table->timestamps();
        });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
