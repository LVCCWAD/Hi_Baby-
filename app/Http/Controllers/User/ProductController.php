// Add search logging to existing search method
use App\Models\SearchLog;

public function search(Request $request)
{
    $query = $request->get('query');

    if ($query) {
        // Perform search
        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->get();

        // Log the search
        SearchLog::create([
            'search_term' => $query,
            'results_count' => $products->count(),
            'user_ip' => $request->ip(),
            'user_id' => auth()->id()
        ]);

        return response()->json($products);
    }

    return response()->json([]);
}
