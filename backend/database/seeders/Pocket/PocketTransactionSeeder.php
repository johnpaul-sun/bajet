<?php

namespace Database\Seeders\Pocket;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pocket;
use App\Models\PocketTransaction;
use App\Models\Wallet;
use App\Models\WalletTransaction;

class PocketTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        date_default_timezone_set('Asia/Manila');
        foreach (Pocket::all() as $pocket) {
            PocketTransaction::create([
                'pocket_id' => $pocket->id,
                'wallet_id' => 1,
                'amount' => $pocket->amount,
                'transaction_type' => "update",
            ])->histories()->create([
                'user_id' => $pocket->user_id
            ]);
        }
    }
}
