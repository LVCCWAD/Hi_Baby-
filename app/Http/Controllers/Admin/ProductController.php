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
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{

    public function index()
    {
        return Inertia::render('User/Home', [
            'products' => Product::with(['reviews', 'categories', 'colors', 'gender', 'sizes'])->get(),
        ]);
    }


    public function show(Product $products)
    {
        $products = Product::with(['reviews', 'categories', 'colors', 'sizes', 'gender'])->latest()->get();
        
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

        try {
            $categoryIds = $validated['category_ids'];
            $colorIds = $validated['color_ids'];
            $sizeIds = $validated['size_ids'];

            unset($validated['category_ids'], $validated['color_ids'], $validated['size_ids']);

            $product = Auth::user()->products()->create($validated);

            // Sync many-to-many
            $product->categories()->sync($categoryIds);

            // One-to-many update
            Color::whereIn('id', $colorIds)->update(['product_id' => $product->id]);
            Size::whereIn('id', $sizeIds)->update(['product_id' => $product->id]);

            return redirect()->route('admin.products')->with('success', 'Product added successfully!');
        } catch (\Throwable $e) {
            dd($e->getMessage());
        }
    }

    public function edit(Product $product)
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

            if (File::exists($imagePath)) {
                File::delete($imagePath);
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

        // Remove relationship fields before updating the product
        unset($validated['category_ids'], $validated['color_ids'], $validated['size_ids']);

        // Update product fields
        $product->update($validated);

        // Sync many-to-many (categories)
        $product->categories()->sync($categoryIds);

        $product->colors()->update(['product_id' => null]);
        $product->sizes()->update(['product_id' => null]);

        // One-to-many update
        Color::whereIn('id', $colorIds)->update(['product_id' => $product->id]);
        Size::whereIn('id', $sizeIds)->update(['product_id' => $product->id]);

        return redirect()->route('admin.products')->with('success', 'Product updated successfully!');
    }


    public function delete(Product $product)
    {
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully!');
    }


    //USER
    public function showGirlsProducts()
    {
        return Inertia::render('User/Girls', [
            'products' => Product::with(['categories', 'colors', 'gender', 'sizes'])->get(),
        ]);
    }

    public function showBoysProducts()
    {
        return Inertia::render('User/Boys', [
            'products' => Product::with(['categories', 'colors', 'gender', 'sizes'])->get(),
        ]);
    }


    public function productDetail(Product $product)
    {
        $product->load(['categories', 'colors', 'sizes', 'gender']);

        return Inertia::render('User/ProductDetail', [
            'product' => $product
        ]);
    }
}
