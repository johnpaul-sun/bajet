<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UsersController extends Controller
{
    // Display a listing of the User.
    public function index()
    {
        //
    }

    // Store a newly created User in storage.
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => 'required|email|unique:users|max:191',
            'password' => 'required|string|confirmed|min:9',
        ]);

        $user_id = count(User::get()) + 1;
        $fname = str_replace(' ', '', strtolower($request->first_name));

        User::create([
            'first_name' => $fname,
            'last_name' => $request->last_name,
            'avatar' => "https://api.multiavatar.com/$fname&id=$user_id.png",
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'message' => 'Account Created Successfully'
        ], 201);
    }

    // Login user and generate access token for authentication.
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|max:191',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        // Check user credential
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email or Password is incorrect'], 401);
        }

        $token = $user->createToken('elstoken')->plainTextToken;

        return response()->json([
            'message' => 'Success Login',
            'token' => $token,
            'data' => $user,
        ], 201);
    }

    // Display the specified User.
    public function show($user_id)
    {
        if ($user_id === '1') throw new HttpException(404, 'User not found');

        return response()->json([
            'data' => User::findOrFail($user_id)
        ], 200);
    }

    // Update the specified User in storage. 
    public function update(Request $request, $id)
    {
        //
    }
}
