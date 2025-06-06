<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    use Searchable;

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

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function isLikedBy($user)
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
}
