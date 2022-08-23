<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;

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

    public static function id()
    {
        return auth('sanctum')->id();
    }

    public static function registerUser(Request $request)
    {
        $user_id = User::get()[count(User::get()) - 1]->id + 1;

        $fname = str_replace(' ', '', strtolower($request->first_name));

        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'avatar' => "https://api.multiavatar.com/$fname&id=$user_id.png",
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ])->sendEmailVerificationNotification();

        $token = User::findOrFail($user_id)->createToken('bajetapp')->plainTextToken;

        return response()->json([
            'message' => 'Success! an email verification link has been sent to your email address.',
            'token' => $token,
            'user_id' => $user_id
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
