<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'image',
        'gender_id',
        'user_id',
    ];

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function categories()
{
    return $this->belongsToMany(Category::class);
}


    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_size');
    }

    public function colors()
    {
        return $this->belongsToMany(Color::class, 'color_product');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
