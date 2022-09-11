<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\Pocket\PocketSeeder;
use Database\Seeders\Pocket\PocketTransactionSeeder;
use Database\Seeders\Wallet\WalletSeeder;
use Database\Seeders\Wallet\WalletTransactionSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            PocketSeeder::class,
            WalletSeeder::class,
            WalletTransactionSeeder::class,
            PocketTransactionSeeder::class,
        ]);
    }
}
