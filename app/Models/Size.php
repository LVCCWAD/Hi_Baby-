<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $fillable = [
        'name',
        'product_id',
    ];


    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
