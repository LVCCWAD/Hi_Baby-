<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Dresses',
            'Skirts',
            'Jackets & Sweaters',
            'Pajamas',
            'Polo & Suit',
            'Shirts',
            'Pants & Jeans',
            'Shorts',
        ];

        foreach ($categories as $name) {
            Category::create([
                'name' => $name,
            ]);
        }
    }
}
