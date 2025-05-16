<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $fillable = [
        'name',
        'hex_code',
        'product_id',

    ];

    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
