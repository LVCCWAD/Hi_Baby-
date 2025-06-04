<?php

namespace App\Providers;

use App\Services\ProductSearchService;
use Illuminate\Support\ServiceProvider;


class SearchServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->app->singleton(ProductSearchService::class, function ($app) {
            return new ProductSearchService();
        });
    }


    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
