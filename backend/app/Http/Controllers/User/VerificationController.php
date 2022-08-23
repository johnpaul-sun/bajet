<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Encryption\DecryptException;


class VerificationController extends Controller
{
    public function verify(Request $request)
    {
        $user = User::findOrFail($request->id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            return redirect("http://localhost:3000/verify-email?user=$request->id&verified=true");
        }

        return redirect("http://localhost:3000/");
    }

    public function resend()
    {
        if (auth('sanctum')->user()->hasVerifiedEmail())
            return response()->json(["message" => "Email already verified."], 400);

        auth('sanctum')->user()->sendEmailVerificationNotification();

        return response()->json(["message" => "Email verification link sent on your email id"]);
    }
}
