<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Encryption\DecryptException;


class VerificationController extends Controller
{
    public function verify($user_id, Request $request)
    {
        if (!$request->hasValidSignature())
            return response()->json(["msg" => "Invalid/Expired url provided."], 401);

        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            return response()->json(["message" => "Thank you for verifying your email."], 200);
        }

        return response()->json(["message" => "You already verified your email address."], 200);
    }

    public function resend()
    {
        if (auth('sanctum')->user()->hasVerifiedEmail())
            return response()->json(["message" => "Email already verified."], 400);

        auth('sanctum')->user()->sendEmailVerificationNotification();

        return response()->json(["message" => "Email verification link sent on your email id"]);
    }
}
