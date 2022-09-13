<?php

namespace App\Http\Controllers\History;

use App\Http\Controllers\Controller;
use App\Models\History;
use App\Models\PocketTransaction;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    /* 
        These are intentional methods to practice my self on accessing polymorphic relationships; 
        and to create my methods on converting the class to data; 
        and also I would like to use react paginate in FE.
    */
    public function all()
    {
        $history = History::all();

        $history_data = [];

        foreach ($history as $data) {
            if ($data->historiable_type === "WalletTransaction") {
                $wallet_data = WalletTransaction::findOrFail($data->historiable_id);

                array_push($history_data, [
                    "account_type" => "wallet",
                    "data" => $wallet_data
                ]);
            } else {
                $pocket_data = PocketTransaction::with('wallet')->with('pocket')->findOrFail($data->historiable_id);

                array_push($history_data, [
                    "account_type" => "pocket",
                    "data" => $pocket_data
                ]);
            };
        };

        return response()->json($history_data);
    }

    public function wallet()
    {
        $wallet_transaction = History::where("historiable_type", "WalletTransaction")->get();

        $wallet_data = History::getWalletData($wallet_transaction);

        return response()->json($wallet_data);
    }

    public function pocket()
    {
        $pocket_transaction = History::where("historiable_type", "PocketTransaction")->get();

        $pocket_data = History::getPocketData($pocket_transaction);

        return response()->json($pocket_data);
    }
}
