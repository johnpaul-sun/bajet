<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use App\Models\Pocket;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function pocket()
    {
        return $this->hasMany(Pocket::class);
    }

    public static function id()
    {
        return auth('sanctum')->id();
    }

    public static function verifyUser($request)
    {
        $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => 'required|email|unique:users|max:191',
            'password' => 'required|string|confirmed|min:9',
        ]);
    }

    public static function updateUserDetails($request)
    {
        $user = User::find(User::id());

        // User must confirm current password if they want to update something.
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Old Password is incorrect'], 401);
        }

        // Update specific details if the user wants to, set to current value if not.
        $user->update([
            'first_name' => $request->first_name ? $request->first_name : $user->first_name,
            'last_name' => $request->last_name ? $request->last_name : $user->last_name,
            'email' => $request->email ? $request->email : $user->email,
            'password' => $request->new_password ? bcrypt($request->new_password) : $user->password,
        ]);

        return response()->json(['message' => 'Account Updated Successfully'], 201);
    }
}
