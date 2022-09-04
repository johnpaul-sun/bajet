<?php

namespace Database\Seeders\Wallet;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Wallet;
use App\Models\WalletTransaction;

class WalletTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 3; $i++) {
            foreach (Wallet::all() as $wallet) {
                WalletTransaction::create([
                    'wallet_id' => $wallet->id,
                    'amount' => 999,
                    'transaction_type' => "income",
                ]);
            }
        }
    }
}
