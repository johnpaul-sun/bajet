<?php

namespace App\Providers;

use App\Models\PocketTransaction;
use App\Models\WalletTransaction;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            'WalletTransaction' => WalletTransaction::class,
            'PocketTransaction' => PocketTransaction::class
        ]);
    }
}
