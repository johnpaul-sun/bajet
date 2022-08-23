<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ForgotPasswordController extends Controller
{
    public function forgot()
    {
        $credentials = request()->validate(['email' => 'required|email']);

        $res = Password::sendResetLink($credentials);

        return response()->json(["message" => __($res)]);
    }

    public function redirect(Request $request)
    {
        return redirect("http://localhost:3000/forgot-password?token=$request->token&email=$request->email");
    }

    public function reset()
    {
        $credentials = request()->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|confirmed|min:9'
        ]);

        $reset_password_status = Password::reset($credentials, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });

        if ($reset_password_status == Password::INVALID_TOKEN) {
            return response()->json(["message" => __(Password::INVALID_TOKEN)], 400);
        }

        return response()->json(["message" => __(Password::INVALID_TOKEN)]);
    }
}
