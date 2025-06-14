<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ReviewsController extends Controller
{
    public function showReviews(Product $product)
    {
        $product = Product::with([
            'reviews.user:id,id,username,picture',
            'categories',
            'colors',
            'sizes'
        ])->findOrFail($product->id);

        return Inertia::render('User/ProductDetail', [
            'product' => $product,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function storeReviews(Request $request, Product $product)
    {
        $request->validate([
            'review' => 'nullable|string',  // <-- allow empty review
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $product->reviews()->create([
            'review' => $request->review,
            'rating' => $request->rating,
            'user_id' => Auth::id(),
        ]);

        session()->flash('success', 'Product updated!');
        return Inertia::location(route('products.show', $product->id));
    }


    public function updateReview(Request $request, Product $product, Review $review)
    {
        if (Auth::id() !== $review->user_id) {
            return redirect()->back()->with('error', 'Unauthorized action.');
        }

        $request->validate([
            'review' => 'nullable|string',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $review->update([
            'review' => $request->review,
            'rating' => $request->rating,
        ]);

        return redirect()->back()->with('success', 'Review updated successfully!');
    }


    public function destroyReview(Product $product, Review $review)
    {
        if (Auth::id() !== $review->user_id) {
            return redirect()->back()->with('error', 'Unauthorized action.');
        }

        $review->delete();

        return redirect()->back()->with('success', 'Review deleted successfully!');
    }
}
