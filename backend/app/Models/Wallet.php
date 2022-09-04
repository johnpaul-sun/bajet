<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\WalletTransaction;
use App\Models\User;

class Wallet extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function walletTransaction()
    {
        return $this->hasMany(WalletTransaction::class);
    }

    public static function verifyWallet($request)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'name' => 'required|string|max:191',
            'income_every' => 'required|string',
            'amount' => 'required|numeric',
            'is_active' => 'required|boolean',
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
