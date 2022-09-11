<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Wallet;

class Income1Schedule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:1day';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This will automatically run an income state in 1 Day';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $wallets = Wallet::where("income_every", "1 Day")->get();

        foreach ($wallets as $wallet) {
            $income = $wallet->income;

            $wallet->update([
                "amount" => $wallet->amount + $income,
            ]);
        }
    }
}
