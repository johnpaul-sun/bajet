<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\HttpException;


class UserController extends Controller
{
    // Display a listing of the User.
    public function index()
    {
        $users = User::where('is_admin', false)->get();

        return response()->json(['data' => $users], 200);
    }

    // Store a newly created User in Database.
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => 'required|email|unique:users|max:191',
            'password' => 'required|string|confirmed|min:9',
        ]);

        return User::registerUser($request);
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

    // Update the specified User in Database. 
    public function update(Request $request)
    {
        $request->validate([
            'first_name' => 'string|max:191|nullable',
            'last_name' => 'string|max:191|nullable',
            'email' => 'email|unique:users|max:191|nullable',
            'current_password' => 'string|required',
            'new_password' => 'string|nullable|min:9',
        ]);

        return User::updateUserDetails($request);
    }

    // Update the specified User in Database. 
    public function updateAvatar()
    {
        $user = User::find(User::id());
        $random = rand(111111, 999999);
        $fname = str_replace(' ', '', strtolower($user->first_name));

        $user->update([
            'avatar' => "https://api.multiavatar.com/$fname&id=$user->id&generate=$random.png"
        ]);

        return response()->json('success', 201);
    }

    // Logout user and delete the access token from Database. 
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out',
        ], 201);
    }
}
