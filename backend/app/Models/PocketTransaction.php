<?php

namespace App\Models;

use App\Models\Pocket;
use App\Models\Wallet;
use App\Models\History;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PocketTransaction extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $hidden = [
        'wallet_id'
    ];

    public function pocket()
    {
        return $this->belongsTo(Pocket::class);
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public static function getPocket($pocket_id)
    {
        return PocketTransaction::where("pocket_id", $pocket_id)->get();
    }

    public function histories()
    {
        return $this->morphMany(History::class, 'historiable');
    }
}
