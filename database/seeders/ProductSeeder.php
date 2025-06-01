<?php

namespace Database\Seeders;

use App\Models\Size;
use App\Models\User;
use App\Models\Color;
use App\Models\Gender;
use App\Models\Product;
use App\Models\Category;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $user = User::first();

        $products = [
            [
                'name' => 'Baby Cotton T-Shirt',
                'description' => 'Soft and comfortable cotton t-shirt perfect for everyday wear',
                'price' => 19.99,
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpQos2X4a-ELYZeg5UkTvcLT79ui9NGbG6cw&s',
            ],
            [
                'name' => 'Denim Overall',
                'description' => 'Adorable denim overall with adjustable straps',
                'price' => 34.99,
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUklBujan8uy9NLwYJ8kq0Zcay1kp6nqUSWA&s',
            ],
            [
                'name' => 'Cozy Pajama Set',
                'description' => 'Two-piece pajama set made with soft cotton',
                'price' => 24.99,
                'image' => 'https://babeemall.com/cdn/shop/files/13_9bcd5145-3ee1-433e-8f9f-66241261d28b.png?v=1701882928&width=1946',
            ],
            [
                'name' => 'Winter Jacket',
                'description' => 'Warm and stylish winter jacket for cold days',
                'price' => 49.99,
                'image' => 'https://down-ph.img.susercontent.com/file/e21655044df78471340c4ce6a31824c6',
            ],
            [
                'name' => 'Summer Dress',
                'description' => 'Light and breezy summer dress with floral pattern',
                'price' => 29.99,
                'image' => 'https://m.media-amazon.com/images/I/71S6BGG97gS._AC_SL1500_.jpg',
            ],
        ];


        $sizeNames = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        $colorOptions = [
            ['name' => 'Red', 'hex_code' => '#FF0000'],
            ['name' => 'Blue', 'hex_code' => '#0000FF'],
            ['name' => 'Green', 'hex_code' => '#00FF00'],
        ];

        foreach ($products as $productData) {
            $gender = Gender::inRandomOrder()->first();

            $product = Product::create([
                'name' => $productData['name'],
                'description' => $productData['description'],
                'price' => $productData['price'],
                'quantity' => $faker->numberBetween(10, 50),
                'gender_id' => $gender->id,
                'user_id' => $user->id,
                'image' => $productData['image'],
            ]);

            // Create sizes for this product
            $randomSizes = array_rand($sizeNames, rand(1, 3)); // Randomly select 1 to 3 sizes
            if (is_array($randomSizes)) {
                // If multiple sizes were selected
                foreach ($randomSizes as $sizeIndex) {
                    $product->sizes()->create([
                        'name' => $sizeNames[$sizeIndex],
                    ]);
                }
            } else {
                // If only one size was selected
                $product->sizes()->create([
                    'name' => $sizeNames[$randomSizes],
                ]);
            }

            // Create colors for this product
            $randomColors = array_rand($colorOptions, rand(1, 3)); // Randomly select 1 to 3 colors
            if (is_array($randomColors)) {
                // If multiple colors were selected
                foreach ($randomColors as $colorIndex) {
                    $product->colors()->create($colorOptions[$colorIndex]);
                }
            } else {
                // If only one color was selected
                $product->colors()->create($colorOptions[$randomColors]);
            }

            // Categories: many-to-many stays as-is
            $categories = Category::inRandomOrder()->take(rand(1, 2))->pluck('id')->toArray();
            $product->categories()->attach($categories);
        }
    }
}
