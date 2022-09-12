<?php

namespace App\Http\Controllers\Pocket;

use App\Http\Controllers\Controller;
use App\Models\PocketTransaction;
use App\Models\User;
use Illuminate\Http\Request;

class PocketTransactionController extends Controller
{
    public static function makeTransaction(Request $request)
    {
        $user_id = User::id();

        PocketTransaction::create([
            "pocket_id" => $request->pocket_id,
            "wallet_id" => $request->wallet_id,
            "amount" => $request->amount,
            "transaction_type" => $request->transaction_type
        ])->histories()->create([
            'user_id' => $user_id
        ]);

        return response()->json([
            "message" => "Pocket transaction has been created"
        ]);
    }
}
