<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UsersController;

//------------------All-Public-Routes------------------//
Route::group(['prefix' => '/v1'], function () {
    Route::get('/', function () {
        return response('You are at the version 1 of this api');
    });

    // User Routes.
    Route::post('/users', [UsersController::class, 'register']);
    Route::post('/users/login', [UsersController::class, 'login']);
});

//------------------All-Private-Routes------------------//
Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => '/v1'
], function () {
    // User Routes.
    Route::resource('/users', UsersController::class)
        ->only(['index', 'show', 'update']);
    Route::post('/users/logout', [UsersController::class, 'logout']);
});
