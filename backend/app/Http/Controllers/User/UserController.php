<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Pocket;
use App\Models\Wallet;
use App\Models\WalletTransaction;
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

    public function register(Request $request)
    {
        User::verifyUser($request);

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

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:191',
            'password' => 'required|string|min:9',
        ]);

        $user = User::where('email', $request->email)->first();

        // Check user credential
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email or Password is incorrect'], 404);
        }

        $token = $user->createToken('elstoken')->plainTextToken;

        return response()->json([
            'message' => 'Success Login',
            'token' => $token,
            'data' => $user,
        ], 201);
    }

    public function show($user_id)
    {
        if ($user_id === '1') throw new HttpException(404, 'User not found');

        return response()->json([
            'data' => User::findOrFail($user_id)
        ], 200);
    }

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

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out',
        ], 201);
    }

    public function netWorth()
    {
        $expense = Pocket::all();
        $expense_amount = [];
        foreach ($expense as $data) {
            array_push($expense_amount, $data->amount_to_pay);
        }
        $total_expense = WalletTransaction::total($expense_amount);

        $income = Wallet::all();
        $income_amount = [];
        foreach ($income as $data) {
            array_push($income_amount, $data->amount);
        }
        $total_income = WalletTransaction::total($income_amount);

        return response()->json(["expense" => $total_expense, "income" => $total_income]);
    }
}
