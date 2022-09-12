<?php

namespace App\Http\Controllers\Wallet;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;

class WalletTransactionController extends Controller
{
    public function makeTransaction(Request $request)
    {
        $user_id = User::id();

        WalletTransaction::create([
            "wallet_id" => $request->wallet_id,
            "name" => $request->name,
            "amount" => $request->amount,
            "transaction_type" => $request->transaction_type
        ])->histories()->create([
            'user_id' => $user_id
        ]);

        return response()->json([
            "message" => "Wallet transaction has been created"
        ]);
    }
}
