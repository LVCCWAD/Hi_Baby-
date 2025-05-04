<?php

namespace App\Http\Controllers\Admin;

use App\Models\Size;
use Inertia\Inertia;
use App\Models\Color;
use App\Models\Gender;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class ProductController extends Controller
{

    public function index()
    {
        return Inertia::render('User/Home');
    }
    public function show(Product $products)
    {
        $products = Product::with(['categories', 'colors', 'sizes', 'gender'])->get();

        return Inertia::render('Admin/Products', [
            'products' => $products
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/AddProduct', [
            'categories' => Category::all(),
            'colors' => Color::all(),
            'sizes' => Size::all(),
            'genders' => Gender::all(),


        ]);
    }

    public function store(Request $request)
    {

        // dd($request->all());
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
        }

        // Handle file upload and product creation logic here
        try {
            // Extract relationship IDs from validated data
            $categoryIds = $validated['category_ids'];
            $colorIds = $validated['color_ids'];
            $sizeIds = $validated['size_ids'];

            // Remove relationship fields from validated data
            unset($validated['category_ids'], $validated['color_ids'], $validated['size_ids']);

            // Create the product
            $product = Auth::user()->products()->create($validated);

            // Sync all relationships
            $product->categories()->sync($categoryIds);
            $product->colors()->sync($colorIds);
            $product->sizes()->sync($sizeIds);

            return redirect()->route('admin.products')->with('success', 'Product added successfully!');
        } catch (\Throwable $e) {
            dd($e->getMessage());
        }
    }
    public function edit(Product $product)
    {
        return Inertia::render('Admin/EditProduct', [
            'product' => $product,
            'categories' => Category::all(),
            'colors' => Color::all(),
            'sizes' => Size::all(),
            'genders' => Gender::all(),

        ]);
    }
    public function update(Request $request, Product $product)
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
        }

        // Extract relationship IDs
        $categoryIds = $validated['category_ids'];
        $colorIds = $validated['color_ids'];
        $sizeIds = $validated['size_ids'];

        // Remove relationship fields from validated data
        unset($validated['category_ids'], $validated['color_ids'], $validated['size_ids']);

        // Update the product
        $product->update($validated);

        // Sync all relationships
        $product->categories()->sync($categoryIds);
        $product->colors()->sync($colorIds);
        $product->sizes()->sync($sizeIds);

        return redirect()->route('admin.products')->with('success', 'Product updated successfully!');
    }




    public function delete(Product $product)
    {
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully!');
    }
}
