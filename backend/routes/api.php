<?php

use App\Http\Controllers\History\HistoryController;
use App\Http\Controllers\Pocket\PocketController;
use App\Http\Controllers\Pocket\PocketTransactionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\VerificationController;
use App\Http\Controllers\User\ForgotPasswordController;
use App\Http\Controllers\Wallet\WalletController;
use App\Http\Controllers\Wallet\WalletTransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

//------------------All-Public-Routes------------------//
Route::group(['prefix' => '/v1'], function () {
    Route::get('/', function () {
        return 'You\'re currently at the version 1 of this api';
    });

    // User Routes. 
    Route::post('/users', [UserController::class, 'register']);
    Route::post('/users/login', [UserController::class, 'login']);
    Route::get('/users/email/verify', [VerificationController::class, 'verify'])->name('verification.verify');
    Route::get('/users/email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
    Route::post('/users/forgot-password', [ForgotPasswordController::class, 'forgot'])->name('password.forgot');
    Route::get('/users/redirect', [ForgotPasswordController::class, 'redirect'])->name('password.reset');
    Route::post('/users/reset-password', [ForgotPasswordController::class, 'reset']);
});

//------------------All-Private-Routes------------------//
Route::group([
    'middleware' => ['auth:sanctum', 'verified'],
    'prefix' => '/v1'
], function () {
    // User Routes.
    Route::resource('/users', UserController::class)
        ->only(['index', 'show']);
    Route::put('/users', [UserController::class, 'update']);
    Route::put('/users/avatar', [UserController::class, 'updateAvatar']);
    Route::post('/users/logout', [UserController::class, 'logout']);

    // Pocket Routes.
    Route::resource('/pockets', PocketController::class);
    Route::post('/pockets/pay', [PocketController::class, 'pay']);
    Route::get('/pockets/search/{pocket_name}', [PocketController::class, 'search']);
    Route::post('/pockets/archive/{pocket_id}', [PocketController::class, 'archive']);
    Route::post('/pockets/unarchive/{pocket_id}', [PocketController::class, 'unarchive']);
    Route::post('/pockets/transaction', [PocketTransactionController::class, 'makeTransaction']);

    // Wallet Routes.
    Route::resource('/wallets', WalletController::class);
    Route::get('/wallets/get/all', [WalletController::class, 'all']);
    Route::get('/wallets/search/{wallet_name}', [WalletController::class, 'search']);
    Route::post('/wallets/archive/{wallet_id}', [WalletController::class, 'archive']);
    Route::post('/wallets/unarchive/{wallet_id}', [WalletController::class, 'unarchive']);
    Route::post('/wallets/transaction', [WalletTransactionController::class, 'makeTransaction']);

    // History Routes.
    Route::resource('/history', HistoryController::class);
});
