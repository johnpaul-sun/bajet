<?php

namespace App\Models;

use App\Models\Pocket;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PocketTransaction extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function pocket()
    {
        return $this->belongsTo(Pocket::class);
    }

    public static function getPocket($pocket_id)
    {
        return PocketTransaction::where("pocket_id", $pocket_id)->get();
    }
}
