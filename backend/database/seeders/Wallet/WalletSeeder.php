<?php

namespace Database\Seeders\Wallet;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Wallet;
use App\Models\User;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $wallet_name = [
            "Income X Seeder",
            "Income Y Seeder",
            "Income Z Seeder"
        ];

        foreach (User::all() as $key => $user) {
            $income = rand(6999, 9999);
            Wallet::create([
                'user_id' => $user->id,
                'name' => $wallet_name[$key],
                'income_every' => "15 Days",
                'income' => $income,
                'amount' => $income,
                'is_active' => true
            ]);
        }
    }
}
