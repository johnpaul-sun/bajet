<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class History extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function historiable()
    {
        return $this->morphTo();
    }

    public static function getWalletData($data)
    {
        $wallet_data = [];
        foreach ($data as $wallet) {
            $data = WalletTransaction::with('wallet')->findOrFail($wallet->historiable_id);

            $data->wallet->is_active && array_push($wallet_data, $data);
        }
        return $wallet_data;
    }

    public static function getPocketData($data)
    {
        $pocket_data = [];
        foreach ($data as $pocket) {
            $data = PocketTransaction::with('wallet')->with('pocket')->findOrFail($pocket->historiable_id);

            $data->pocket->is_active && array_push($pocket_data, $data);
        }
        return $pocket_data;
    }
}
