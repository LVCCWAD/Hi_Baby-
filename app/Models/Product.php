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
        return $this->hasMany(Size::class);
    }

    public function colors()
    {
        return $this->hasMany(Color::class);
    }

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
