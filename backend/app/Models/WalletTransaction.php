<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wallet;

class WalletTransaction extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public static function getWallet($wallet_id)
    {
        return WalletTransaction::where("wallet_id", $wallet_id)->get();
    }
}
