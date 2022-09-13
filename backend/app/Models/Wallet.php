<?php

namespace App\Models;

use App\Models\User;
use App\Models\History;
use App\Models\PocketTransaction;
use App\Models\WalletTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wallet extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pocketTransaction()
    {
        return $this->hasMany(PocketTransaction::class);
    }

    public function walletTransaction()
    {
        return $this->hasMany(WalletTransaction::class);
    }

    public static function verifyWallet($request)
    {
        $request->validate([
            'name' => 'required|string|max:191',
            'income_every' => 'required|string',
            'amount' => 'required|numeric',
        ]);
    }

    public static function verifyUpdateWallet($request)
    {
        $request->validate([
            'name' => 'nullable|string|max:191',
            'amount' => 'nullable|numeric',
            'income_every' => 'required|string',
        ]);
    }

    public function histories()
    {
        return $this->morphMany(History::class, 'historiable');
    }

    public static function verifyTransfer($request)
    {
        $request->validate([
            'from_wallet' => 'required|numeric',
            'to_wallet' => 'required|numeric',
            'amount' => 'required|numeric',
        ]);
    }
}
