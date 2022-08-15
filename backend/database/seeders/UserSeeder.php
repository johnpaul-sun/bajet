<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'avatar' => 'https://api.multiavatar.com/admin&id=1.png',
            'email' => 'admin@super.com',
            'password' => bcrypt('letmein'),
            'is_admin' => true
        ]);

        User::factory(2)->create();
    }
}
