<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{

    private function addLikedStatus($products, $userId)
    {
        return $products->map(function ($product) use ($userId) {
            $product->liked = $product->likes()->where('user_id', $userId)->exists();
            return $product;
        });
    }


    public function likedProductsInGirls()
    {
        $userId =  Auth::id();


        // Filter girls products
        $products = Product::with(['categories', 'sizes', 'gender'])
            ->whereHas('gender', function ($q) {
                $q->where('name', 'Girls');
            })
            ->withCount('likes')
            ->get();

        // Add liked flag
        $products = $this->addLikedStatus($products, $userId);

        return Inertia::render('User/Girls', [
            'products' => $products,
        ]);
    }


    public function likedProductsInBoys()
    {
        $userId =  Auth::id();


        // Filter boys products
        $products = Product::with(['categories', 'sizes', 'gender'])
            ->whereHas('gender', function ($q) {
                $q->where('name', 'Boys');
            })
            ->withCount('likes')
            ->get();

        // Add liked flag
        $products = $this->addLikedStatus($products, $userId);

        return Inertia::render('User/Boys', [
            'products' => $products,
        ]);
    }

    public function likeChecker(Product $product)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->back()->with('error', 'You must be logged in to like products.');
        }

        // Check if user already liked the product
        $like = $product->likes()->where('user_id', $user->id)->first();

        if ($like) {
            // Unlike: delete the Like record
            $like->delete();
            $message = 'Product unliked successfully.';
        } else {
            // Like: create a new Like record
            $product->likes()->create([
                'user_id' => $user->id,
            ]);
            $message = 'Product liked successfully.';
        }

        return redirect()->back()->with('success', $message);
    }
}
