<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\User;
use App\Models\Product;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create a product
        $product = Product::first() ?? Product::factory()->create();

        // Get some users to assign reviews to
        $users = User::take(5)->get();

        // Create 5 reviews for the product
        foreach ($users as $user) {
            Review::create([
                'product_id' => $product->id,
                'user_id' => $user->id,
                'review' => fake()->paragraph(),
                'rating' => rand(1, 5),
            ]);
        }
    }
}
