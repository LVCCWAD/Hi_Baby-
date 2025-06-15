<?php

namespace App\Http\Controllers\Admin;

use App\Models\Like;
use App\Models\Size;
use Inertia\Inertia;
use App\Models\Color;
use App\Models\Gender;
use App\Models\Product;
use App\Models\Category;
use App\Models\SearchLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Services\ProductSearchService;


class ProductController extends Controller
{

    private function addLikedStatus($products, $userId)
    {
        return $products->map(function ($product) use ($userId) {
            $product->liked = $product->likes()->where('user_id', $userId)->exists();
            return $product;
        });
    }

    public function unlike(Product $product)
    {
        $user = Auth::user();

        if ($user) {
            // Find the Like record for this user and product
            $like = $user->likes()->where('product_id', $product->id)->first();

            if ($like) {
                $like->delete();
                // Redirect back with success message
                return redirect()->back()->with('success', 'Product unliked successfully.');
            }

            // If no like found, maybe redirect back with a message
            return redirect()->back()->with('error', 'You have not liked this product.');
        }

        // If not logged in
        return redirect()->back()->with('error', 'You must be logged in to unlike products.');
    }




    public function showUserLikedProducts()
    {
        $userId = Auth::id();

        $likedProducts = Product::with(['reviews', 'categories', 'colors', 'gender', 'sizes'])
            ->withCount('likes')
            ->whereHas('likes', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->get();

        $likedProducts = $this->addLikedStatus($likedProducts, $userId);

        return Inertia::render('User/ProfileView', [
            'likedProducts' => $likedProducts,
        ]);
    }


    public function showProductsToUserHome()
    {
        $userId = Auth::id();

        $products = Product::with(['reviews', 'categories', 'colors', 'gender', 'sizes'])
            ->withCount('likes')
            ->get();

        $products = $this->addLikedStatus($products, $userId);

        return Inertia::render('User/Home', [
            'products' => $products,
        ]);
    }


    public function showProductsToAdmin(Product $products)
    {
        $products = Product::with(['reviews', 'categories', 'colors', 'sizes', 'gender'])->latest()->get();

        return Inertia::render('Admin/Products', [
            'products' => $products
        ]);
    }


    public function createProduct()
    {
        return Inertia::render('Admin/AddProduct', [
            'categories' => Category::all(),
            'colors' => Color::all(),
            'sizes' => Size::all(),
            'genders' => Gender::all(),

        ]);
    }

    public function storeCreatedProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gender_id' => 'required|exists:genders,id',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'size_ids' => 'required|array',
            'size_ids.*' => 'exists:sizes,id',
            'color_ids' => 'required|array',
            'color_ids.*' => 'exists:colors,id',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = $imagePath;
        }

        try {
            // Extract pivot arrays
            $categoryIds = $validated['category_ids'];
            $colorIds = $validated['color_ids'];
            $sizeIds = $validated['size_ids'];

            // Remove pivot fields from main validated data
            unset($validated['category_ids'], $validated['color_ids'], $validated['size_ids']);

            // Create product
            $product = Auth::user()->products()->create($validated);

            // Sync many-to-many
            $product->categories()->sync($categoryIds);
            $product->colors()->sync($colorIds);
            $product->sizes()->sync($sizeIds);

            return Inertia::location(route('admin.products'));
        } catch (\Throwable $e) {
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }




    public function editProduct(Product $product)
    {
        $product->load('categories');
        $product->load('colors');
        $product->load('sizes');
        return Inertia::render('Admin/EditProduct', [
            'product' => $product,
            'categories' => Category::all(),
            'colors' => Color::all(),
            'sizes' => Size::all(),
            'genders' => Gender::all(),

        ]);
    }


    public function updateProduct(Request $request, Product $product)
    {
        $validated = request()->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gender_id' => 'required|exists:genders,id',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'size_ids' => 'required|array',
            'size_ids.*' => 'exists:sizes,id',
            'color_ids' => 'required|array',
            'color_ids.*' => 'exists:colors,id',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validated['image'] = $imagePath;

            // Delete old image if exists
            if (File::exists(public_path($product->image))) {
                File::delete(public_path($product->image));
            }

            $file = $request->file('image');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('storage/products'), $fileName);
            $validated['image'] = 'products/' . $fileName;
        } else {
            $validated['image'] = $product->image;
        }

        $categoryIds = $validated['category_ids'];
        $colorIds = $validated['color_ids'];
        $sizeIds = $validated['size_ids'];

        // Remove relationship fields before updating product
        unset($validated['category_ids'], $validated['color_ids'], $validated['size_ids']);

        // Update product fields
        $product->update($validated);

        // Sync many-to-many relationships
        $product->categories()->sync($categoryIds);
        $product->colors()->sync($colorIds);
        $product->sizes()->sync($sizeIds);

        session()->flash('success', 'Product updated successfully!');
        return Inertia::location(route('admin.products'));
    }



    public function deleteProduct(Product $product)
    {
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully!');
    }


    //USER
    public function showGirlsProducts()
    {
        $products = Product::with(['categories', 'colors', 'gender', 'sizes'])
            ->get()
            ->map(function ($product) {
                $product->image_url = $product->image_url;
                return $product;
            });

        return Inertia::render('User/Girls', [
            'products' => $products,
        ]);
    }



    public function showBoysProducts()
    {
        $products = Product::with(['categories', 'colors', 'gender', 'sizes'])->get();

        // Add full image URL for each product
        $products->each(function ($product) {
            $product->image_url = $product->image
                ? asset('storage/' . $product->image)
                : asset('default-image.jpg'); // fallback if image is null
        });

        return Inertia::render('User/Boys', [
            'products' => $products,
        ]);
    }



    public function productDetail(Product $product)
    {
        $product->load([
            'categories',
            'colors',
            'sizes',
            'gender',
            'reviews.user' // ✅ this loads review with its user!
        ]);

        $address = Auth::user()->address;

        return Inertia::render('User/ProductDetail', [
            'product' => $product,
            'address' => $address,
            'auth' => ['user' => Auth::user()]
        ]);
    }


    public function index(Request $request, ProductSearchService $searchService)
    {
        $products = $searchService->search($request->input('q'));

        SearchLog::create([
            'search_term' => $request->input('q'),
            'results_count' => count($products),
            'user_id' => Auth::id(),
        ]);

        return inertia('Products/SearchResults', [
            'products' => $products,
        ]);
    }


    public function searchResultsPage(Request $request)
    {
        $query = $request->query('q');
        $userId = Auth::id();

        $products = Product::with(['reviews', 'categories', 'colors', 'gender', 'sizes'])
            ->where('name', 'like', "%{$query}%")
            ->withCount('likes')
            ->get();

        $products = $this->addLikedStatus($products, $userId);

        // ✅ Log search here
        SearchLog::create([
            'search_term' => $query,
            'results_count' => $products->count(),
            'user_id' => $userId,
        ]);

        return Inertia::render('User/Search', [
            'products' => $products,
            'query' => $query,
        ]);
    }


    public function boysCollection($category = null)
    {
        $products = Product::query()
            ->whereHas('gender', function ($query) {
                $query->whereRaw("LOWER(name) = 'boy'");
            });

        if ($category) {
            $categoryName = ucwords(str_replace(['-', 'and'], [' ', '&'], strtolower($category)));

            $products = $products->whereHas('categories', function ($query) use ($categoryName) {
                $query->whereRaw('LOWER(name) = ?', [strtolower($categoryName)]);
            });
        }

        return Inertia::render('User/BoysCollectionPage', [
            'products' => $products->get(),
            'category' => $category,
        ]);
    }
}
