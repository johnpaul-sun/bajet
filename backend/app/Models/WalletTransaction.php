<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wallet;
use App\Models\History;

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

    public function histories()
    {
        return $this->morphMany(History::class, 'historiable');
    }

    public static function total($amount)
    {
        return array_reduce($amount, fn ($prev, $current) => $prev + $current, 0);
    }
}
