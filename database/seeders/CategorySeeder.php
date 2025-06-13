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
        $girlsCategories = [
            'Dresses',
            'Skirts',
            'Jackets & Sweaters',
            'Pajamas',

        ];

        $boysCategories = [
            'Polo & Suit',
            'Shirts',
            'Pants & Jeans',
            'Shorts',
        ];

        // Create girls categories
        foreach ($girlsCategories as $name) {
            Category::create([
                'name' => $name,
                'gender' => 'girl',
            ]);
        }

        // Create boys categories
        foreach ($boysCategories as $name) {
            Category::create([
                'name' => $name,
                'gender' => 'boy',
            ]);
        }
    }
}
