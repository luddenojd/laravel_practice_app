<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActorsController;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\DirectorsController;

//Public routes
Route::middleware('api')->post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $token = $request->user()->createToken('token')->plainTextToken;
        return response()->json(['token' => $token]);
    }

    throw ValidationException::withMessages([
        'email' => ['The provided credentials are incorrect.'],
    ]);
});
    //Users
    Route::post('/users', [\App\Http\Controllers\UsersController::class, 'store']);

    Route::middleware(['auth:sanctum'])->group(function () {
    // Protected routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware(['auth:sanctum'])->post('/logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });

    //Actors
    Route::get('/actors', [\App\Http\Controllers\ActorsController::class, 'index']);
    Route::post('/actors', [\App\Http\Controllers\ActorsController::class, 'store']);
    Route::get('/actors/search/{query}', [\App\Http\Controllers\ActorsController::class, 'search']);
    Route::delete('/actors/{actor}', [\App\Http\Controllers\ActorsController::class, 'destroy']);
    Route::put('/actors/{actor}/restore', [\App\Http\Controllers\ActorsController::class, 'restore']);

    //Movies
    Route::get('/movies', [\App\Http\Controllers\MoviesController::class, 'index']);
    Route::post('/movies', [\App\Http\Controllers\MoviesController::class, 'store']);
    Route::get('/movies/search/{query}', [\App\Http\Controllers\MoviesController::class, 'search']);
    Route::get('/movies/filter', [\App\Http\Controllers\MoviesController::class, 'filter']);
    Route::delete('/movies/{movie}', [\App\Http\Controllers\MoviesController::class, 'destroy']);
    Route::put('/movies/{movie}/restore', [\App\Http\Controllers\MoviesController::class, 'restore']);

    //Directors
    Route::get('/directors', [\App\Http\Controllers\DirectorsController::class, 'index']);
    Route::post('/directors', [\App\Http\Controllers\DirectorsController::class, 'store']);
    Route::get('/directors/search/{query}', [\App\Http\Controllers\DirectorsController::class, 'search']);
    Route::delete('/directors/{director}', [\App\Http\Controllers\DirectorsController::class, 'destroy']);
    Route::put('/directors/{director}/restore', [\App\Http\Controllers\DirectorsController::class, 'restore']);

    //Search
    Route::get('/search', [\App\Http\Controllers\SearchController::class, 'search']);
});
