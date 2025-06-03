<?php

namespace App\Services;

use App\Models\Product;

class ProductSearchService
{
    public function search(string $query, int $limit = 10)
    {
        return Product::where('title', 'like', "%{$query}%")
            ->limit($limit)
            ->get(['id', 'title']);
    }
}
