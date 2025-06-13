<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SearchLog extends Model
{
    protected $fillable = [
        'search_term',
        'results_count',

        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getTopSearchTerms($limit = 10)
    {
        return self::select('search_term')
            ->selectRaw('COUNT(*) as uses, COALESCE(AVG(results_count), 0) as avg_results')
            ->groupBy('search_term')
            ->orderByDesc('uses')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'term' => $item->search_term,
                    'uses' => (int) $item->uses,
                    'results' => (int) round($item->avg_results),
                ];
            });
    }
}
