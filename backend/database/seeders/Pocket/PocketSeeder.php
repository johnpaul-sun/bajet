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
        date_default_timezone_set('Asia/Manila');
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

        foreach (User::all() as $user) {
            for ($i = 0; $i < count(User::get()); $i++) {
                $random = rand(999, 9999);
                $today = intval(date('d'));
                $day = "2022-09-" . rand($today === 31 ? 01 : $today, 31);

                $schedule_day = intval(explode("-", $day)[2]);
                $today = intval(date('d'));

                $is_scheduled = $schedule_day === $today;

                Pocket::create([
                    'user_id' => $user->id,
                    'name' => $pocket_name[$i],
                    'schedule' => "monthly",
                    'schedule_date' => $day,
                    'amount' => $pocket_expense[$i],
                    'amount_to_pay' => $is_scheduled ? $pocket_expense[$i] : 0,
                    'is_active' => true
                ]);
            }
        }
    }
}
