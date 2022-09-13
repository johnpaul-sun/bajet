<?php

namespace App\Http\Controllers\Wallet;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use App\Models\WalletTransaction;
use App\Http\Controllers\Controller;

class WalletController extends Controller
{
    // Display all listing of active the Wallet.
    public function all()
    {
        $data = Wallet::with('walletTransaction')->where("is_active", 1)->get();

        return response($data);
    }

    public function index(Request $request)
    {
        $request->validate([
            "sort_by" => "string|required",
            "sort_type" => "string|required",
            "archive" => "string|required"
        ]);

        $data = Wallet::where("is_active", $request->archive)
            ->with('walletTransaction')
            ->orderBy($request->sort_type, $request->sort_by)
            ->paginate(3);

        return response($data);
    }

    public function store(Request $request)
    {
        Wallet::verifyWallet($request);

        $userId = User::id();

        Wallet::create([
            "user_id" => $userId,
            "name" => $request->name,
            "amount" => $request->amount,
            "income" => $request->amount,
            "is_active" => true,
            "income_every" => $request->income_every,
        ]);

        return response()->json([
            "message" => "Wallet created successfully"
        ]);
    }

    public function show($wallet_id)
    {
        return response(Wallet::with('walletTransaction')->findOrFail($wallet_id));
    }

    public function update(Request $request, $wallet_id)
    {
        $user_id = User::id();

        Wallet::verifyUpdateWallet($request);
        $wallet = Wallet::findOrFail($wallet_id);

        $wallet->update([
            "name" => $request->name ? $request->name : $wallet->name,
            "income" => $request->income ? $request->income : $wallet->income,
            "amount" => $request->amount ? $request->amount : $wallet->amount,
            "income_every" => $request->income_every ? $request->income_every : $wallet->income_every,
        ]);

        WalletTransaction::create([
            "wallet_id" => $wallet->id,
            "name" => $request->name,
            "amount" => $request->amount ? $request->amount : $wallet->amount,
            "transaction_type" => "update"
        ])->histories()->create([
            'user_id' => $user_id
        ]);

        return response()->json([
            "message" => "Wallet data has been updated"
        ]);
    }

    public function archive($wallet_id)
    {
        Wallet::findOrFail($wallet_id)->update(['is_active' => false]);

        return response()->json([
            "message" => "Wallet has been archived"
        ]);
    }

    public function unarchive($wallet_id)
    {
        Wallet::findOrFail($wallet_id)->update(['is_active' => true]);

        return response()->json([
            "message" => "Wallet has been unarchived"
        ]);
    }

    public function destroy($wallet_id)
    {
        Wallet::findOrFail($wallet_id)->delete();

        return response()->json([
            "message" => "Wallet has been deleted"
        ]);
    }

    public function search($wallet_name)
    {
        $result = Wallet::where("name", "like", "%$wallet_name%")->get();

        if (count($result) === 0) return response()->json([
            'message' => "Can't find $wallet_name."
        ], 200);

        return response()->json($result, 200);
    }
}
