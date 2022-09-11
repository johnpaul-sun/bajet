<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Wallet;

class Income15Schedule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:15days';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This will automatically run an income state every 15 Days';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $wallets = Wallet::where("income_every", "15 Days")->get();

        foreach ($wallets as $wallet) {
            $income = $wallet->income;

            $wallet->update([
                "amount" => $wallet->amount + $income,
            ]);
        }
    }
}
