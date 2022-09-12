<?php

namespace App\Http\Controllers\Pocket;

use App\Http\Controllers\Controller;
use App\Models\Pocket;
use App\Models\PocketTransaction;
use App\Models\Wallet;
use App\Models\User;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;

class PocketController extends Controller
{
    // Display all listing of active the Pocket.
    public function index(Request $request)
    {
        $request->validate([
            "sort_by" => "string|required",
            "sort_type" => "string|required",
            "archive" => "string|required"
        ]);

        $data = Pocket::where("is_active", $request->archive)
            ->with('pocketTransaction')
            ->orderBy($request->sort_type, $request->sort_by)
            ->paginate(3);

        return response($data);
    }

    public function store(Request $request)
    {
        Pocket::verifyPocket($request);

        $userId = User::id();

        Pocket::create([
            "user_id" => $userId,
            "name" => $request->name,
            "amount" => $request->amount,
            "amount_to_pay" => 0,
            "is_active" => true,
            "schedule" => $request->schedule,
            "schedule_date" => $request->schedule_date
        ]);

        return response()->json([
            "message" => "Pocket created successfully"
        ]);
    }

    public function show($pocket_id)
    {
        return response(Pocket::with('pocketTransaction')->findOrFail($pocket_id));
    }

    public function update(Request $request, $pocket_id)
    {
        $user_id = User::id();

        Pocket::verifyUpdatePocket($request);
        $pocket = Pocket::findOrFail($pocket_id);

        $pocket->update([
            "name" => $request->name ? $request->name : $pocket->name,
            "amount" => $request->amount ? $request->amount : $pocket->amount,
            "schedule" => $request->schedule ? $request->schedule : $pocket->schedule,
            "schedule_date" => $request->schedule_date ? $request->schedule_date : $pocket->schedule_date
        ]);

        $wallet_id = PocketTransaction::findOrFail($pocket_id)->wallet_id;

        PocketTransaction::create([
            "pocket_id" => $pocket_id,
            "wallet_id" => $wallet_id,
            "amount" => $request->amount ? $request->amount : $pocket->amount,
            "transaction_type" => "update"
        ])->histories()->create([
            'user_id' => $user_id
        ]);

        return response()->json([
            "message" => "Pocket data has been updated"
        ]);
    }

    public function archive($pocket_id)
    {
        Pocket::findOrFail($pocket_id)->update(['is_active' => false]);

        return response()->json([
            "message" => "Pocket has been archived"
        ]);
    }

    public function unarchive($pocket_id)
    {
        Pocket::findOrFail($pocket_id)->update(['is_active' => true]);

        return response()->json([
            "message" => "Pocket has been unarchived"
        ]);
    }

    public function destroy($pocket_id)
    {
        Pocket::findOrFail($pocket_id)->delete();

        return response()->json([
            "message" => "Pocket has been deleted"
        ]);
    }

    public function search($pocket_name)
    {
        $result = Pocket::where("name", "like", "%$pocket_name%")->get();

        if (count($result) === 0) return response()->json([
            'message' => "Can't find $pocket_name."
        ], 200);

        return response()->json($result, 200);
    }

    public function pay(Request $request)
    {
        $user_id = User::id();
        Pocket::verifyPayPocket($request);

        $pocket = Pocket::findOrFail($request->pocket_id);
        $wallet = Wallet::findOrFail($request->wallet_id);

        PocketTransaction::create([
            "pocket_id" => $request->pocket_id,
            "wallet_id" => $request->wallet_id,
            "amount" => $pocket->amount_to_pay,
            "transaction_type" => "expense"
        ])->histories()->create([
            'user_id' => $user_id
        ]);

        WalletTransaction::create([
            "wallet_id" => $request->wallet_id,
            "name" => $pocket->name,
            "amount" => $pocket->amount_to_pay,
            "transaction_type" => "expense"
        ])->histories()->create([
            'user_id' => $user_id
        ]);

        $wallet->update([
            "amount" => $wallet->amount - $pocket->amount_to_pay
        ]);
        $pocket->update([
            "amount_to_pay" => 0
        ]);

        return response()->json([
            "message" => "Paid Successfully"
        ]);
    }
}
