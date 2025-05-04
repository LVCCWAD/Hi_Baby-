<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $genders = [
            ['name' => 'boys'],
            ['name' => 'girls'],
        ];
        foreach ($genders as $gender) {
            Gender::create($gender);
        }
    }



}
