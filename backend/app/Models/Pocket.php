<?php

namespace App\Models;

use App\Models\User;
use App\Models\PocketTransaction;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pocket extends Model
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

    public static function verifyPocket($request)
    {
        $request->validate([
            'name' => 'required|string|max:191',
            'is_active' => 'required|boolean',
            'user_id' => 'required',
            'amount' => 'required|numeric',
            'schedule' => 'required|string',
            'schedule_date' => 'required|date',
        ]);
    }

    public static function verifyUpdatePocket($request)
    {
        $request->validate([
            'name' => 'nullable|string|max:191',
            'amount' => 'nullable|numeric',
            'schedule' => 'nullable|string',
            'schedule_date' => 'nullable|date',
        ]);
    }
}
