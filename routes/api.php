<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActorsController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\DirectorsController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\GenresController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PostsController;

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
    Route::post('/users', [UsersController::class, 'store']);

    Route::middleware(['auth:sanctum'])->group(function () {
    // Protected routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware(['auth:sanctum'])->post('/logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });

    //User
    Route::get('/activeuser', [UsersController::class, 'activeUser']);
    Route::get('/allusers', [UsersController::class, 'index']);
    Route::put('/updateuser/{id}', [UsersController::class, 'update']);
    Route::post('/user/{id}/update-profile-picture', [UsersController::class, 'update'])->name('user.update');

    //Actors
    Route::get('/actors', [ActorsController::class, 'index']);
    Route::post('/actors', [ActorsController::class, 'store']);
    Route::get('/actors/search/{query}', [ActorsController::class, 'search']);
    Route::delete('/actors/{actor}', [ActorsController::class, 'destroy']);
    Route::put('/actors/{actor}/restore', [ActorsController::class, 'restore']);
    Route::post('/movies/{movieId}/actors/{actorId}', [ActorsController::class, 'addActorToMovie']);

    //Movies
    Route::get('/allmovies', [MoviesController::class, 'getAllMovies']);
    Route::get('/movies', [MoviesController::class, 'index']);
    Route::post('/movies', [MoviesController::class, 'store']);
    Route::get('/movies/search/{query}', [MoviesController::class, 'search']);
    Route::get('/movies/filter', [MoviesController::class, 'filter']);
    Route::delete('/movies/{movie}', [MoviesController::class, 'destroy']);
    Route::put('/movies/{movie}/restore', [MoviesController::class, 'restore']);
    Route::post('/users/{userId}/movies/{movieId}', [MoviesController::class, 'addMovieToUser']);
    Route::put('/users/{userId}/movies/{movieId}', [MoviesController::class, 'deleteMovieFromUser']);

    //Directors
    Route::get('/directors', [DirectorsController::class, 'index']);
    Route::post('/directors', [DirectorsController::class, 'store']);
    Route::get('/directors/search/{query}', [DirectorsController::class, 'search']);
    Route::delete('/directors/{director}', [DirectorsController::class, 'destroy']);
    Route::put('/directors/{director}/restore', [DirectorsController::class, 'restore']);

    //Genres
    Route::post('/genres/{genreId}/movies/{movieId}', [GenresController::class, 'addGenreToMovie']);

    //Friends
    Route::post('/acceptFriendRequest', [FriendsController::class, 'acceptFriendRequest']);
    Route::post('/sendFriendRequest', [FriendsController::class, 'sendFriendRequest']);
    Route::get('/friends', [FriendsController::class, 'index']);
    Route::get('/myFriends', [FriendsController::class, 'myFriends']);
    Route::get('/myFriendRequests', [FriendsController::class, 'myFriendRequests']);

    //Messages
    Route::get('/messages', [ConversationController::class, 'index']);
    Route::post('/sendmessage', [ConversationController::class, 'sendMessage']);
    Route::post('/readmessage', [ConversationController::class, 'readMessage']);

    //Search
    Route::get('/search', [SearchController::class, 'search']);

    //Posts
    Route::get('/posts', [PostsController::class, 'index']);
    Route::post('/posts', [PostsController::class, 'store']);

    //Likes
    Route::get('/likes', [LikesController::class, 'index']);
    Route::post('/likes', [LikesController::class, 'store']);

    //Comments
    Route::get('/comments', [CommentsController::class, 'index']);
    Route::post('/comments', [CommentsController::class, 'store']);
});
