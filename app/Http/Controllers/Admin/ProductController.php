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
            'products' => Product::with(['categories', 'colors', 'gender', 'sizes'])->get(),
        ]);
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

        try {
            $categoryIds = $validated['category_ids'];
            $colorIds = $validated['color_ids'];
            $sizeIds = $validated['size_ids'];

            unset($validated['category_ids'], $validated['color_ids'], $validated['size_ids']);

            $product = Auth::user()->products()->create($validated);

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
        }
else {
            $validated['image'] = $product->image;
        }
        $product->update($validated);

        $categoryIds = $validated['category_ids'];
        $colorIds = $validated['color_ids'];
        $sizeIds = $validated['size_ids'];

        unset($validated['category_ids'], $validated['color_ids'], $validated['size_ids']);

        $product->update($validated);

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
