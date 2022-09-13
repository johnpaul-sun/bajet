<?php

namespace Database\Seeders\Pocket;

use App\Models\Pocket;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PocketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pocket_name = [
            "House Rent",
            "Internet Bill",
            "Other Expenses"
        ];
        $pocket_expense = [
            7000,
            1700,
            10000
        ];

        foreach (User::all() as $key => $user) {
            $random = rand(999, 9999);
            $day = rand(01, 31);

            Pocket::create([
                'user_id' => $user->id,
                'name' => $pocket_name[$key],
                'schedule' => "monthly",
                'schedule_date' => "2022-09-$day",
                'amount' => $pocket_expense[$key],
                'amount_to_pay' => $pocket_expense[$key],
                'is_active' => true
            ]);
        }
    }
}
