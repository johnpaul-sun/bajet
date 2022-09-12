<?php

namespace App\Http\Controllers\History;

use App\Http\Controllers\Controller;
use App\Models\History;
use App\Models\PocketTransaction;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wallet_transaction = History::where("historiable_type", "WalletTransaction")->get();
        $pocket_transaction = History::where("historiable_type", "PocketTransaction")->get();

        $wallet_data = History::getWalletData($wallet_transaction);
        $pocket_data = History::getPocketData($pocket_transaction);

        $data = [
            "wallet_transaction" => $wallet_data,
            "pocket_transaction" => $pocket_data
        ];

        return response()->json($data);
    }
}
