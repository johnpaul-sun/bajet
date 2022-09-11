<?php

namespace App\Http\Controllers\Pocket;

use App\Http\Controllers\Controller;
use App\Models\PocketTransaction;
use Illuminate\Http\Request;

class PocketTransactionController extends Controller
{
    public static function makeTransaction(Request $request)
    {
        PocketTransaction::create([
            "pocket_id" => $request->pocket_id,
            "wallet_id" => $request->wallet_id,
            "amount" => $request->amount,
            "transaction_type" => $request->transaction_type
        ]);

        return response()->json([
            "message" => "Pocket transaction has been created"
        ]);
    }
}
