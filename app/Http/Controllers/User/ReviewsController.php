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
        $product->load(['reviews.user', 'categories', 'colors', 'sizes']);

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
            'review' => 'required|string',
            'rating' => 'required|numeric|min:0|max:5',
        ]);

        $product->reviews()->create([
            'review' => $request->review,
            'rating' => $request->rating,
            'user_id' => Auth::id(),
        ]);

        // Redirect to the same page but make sure fresh data is reloaded
        return redirect()->route('products.show', $product->id);
    }


    public function updateReview(Request $request, Product $product, Review $review)
    {
        if (Auth::id() !== $review->user_id) {
            return redirect()->back()->with('error', 'Unauthorized action.');
        }

        $request->validate([
            'review' => 'required|string',
            'rating' => 'required|numeric|min:0|max:5',
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
