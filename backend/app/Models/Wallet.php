<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\WalletTransaction;
use App\Models\PocketTransaction;
use App\Models\User;

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
}
