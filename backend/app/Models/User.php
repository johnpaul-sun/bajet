<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password',
        'verification_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function id()
    {
        return auth('sanctum')->user()->id;
    }

    public static function registerUser($request)
    {
        $user_id = count(User::get()) + 1;
        $fname = str_replace(' ', '', strtolower($request->first_name));

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'avatar' => "https://api.multiavatar.com/$fname&id=$user_id.png",
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'message' => 'Account Created Successfully'
        ], 201);
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
