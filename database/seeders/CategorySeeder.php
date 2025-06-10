<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $boysCategories = [
            'Jackets and Sweaters',
            'Pants and Jeans',
            'Pajamas',
            'Suits',
        ];

        $girlsCategories = [
            'Dresses',
            'Tops and Skirts',
            'Pajamas',
            'Gowns',
        ];

        // Create boys categories
        foreach ($boysCategories as $name) {
            Category::create([
                'name' => $name,
                'gender' => 'boy',  // or 'boys' depending on your convention
            ]);
        }

        // Create girls categories
        foreach ($girlsCategories as $name) {
            Category::create([
                'name' => $name,
                'gender' => 'girl', // or 'girls'
            ]);
        }
    }
}
