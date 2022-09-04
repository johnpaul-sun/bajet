<?php

namespace App\Http\Controllers\Wallet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;

class WalletTransactionController extends Controller
{
    public function makeTransaction(Request $request)
    {
        WalletTransaction::create([
            "wallet_id" => $request->wallet_id,
            "amount" => $request->amount,
            "transaction_type" => $request->transaction_type
        ]);

        return response()->json([
            "message" => "Wallet transaction has been created"
        ]);
    }
}
