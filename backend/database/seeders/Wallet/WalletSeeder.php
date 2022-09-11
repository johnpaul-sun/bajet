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
        foreach (User::all() as $user) {
            $income = rand(999, 9999);
            Wallet::create([
                'user_id' => $user->id,
                'name' => $user->first_name . ' Wallet',
                'income_every' => "15 Days",
                'income' => $income,
                'amount' => $income,
                'is_active' => true
            ]);
        }
    }
}
