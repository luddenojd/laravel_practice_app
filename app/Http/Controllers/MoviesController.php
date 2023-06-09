<?php

namespace App\Http\Controllers;

use App\Models\Movies;
use App\Models\User;
use Illuminate\Http\Request;

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $movies = $user->movies()
            ->with(['actors', 'directors', 'genres', 'users' => function ($query) use ($user) {
                $query->where('user_id', $user->id)->select('movie_users.is_favorite');
            }])
            ->get();

        $movies = $movies->map(function ($movie) {
            $movie->is_favorite = $movie->users->isNotEmpty() ? $movie->users[0]->pivot->is_favorite : false;
            return $movie;
        });

        return response()->json([
            'user' => $user,
            'movies' => $movies,
        ]);
    }

    public function getAllMovies(Request $request)
    {
        $user = $request->user();
        $loggedInUserId = $user ? $user->id : null;

        $movies = Movies::with(['actors', 'directors', 'genres', 'users' => function ($query) use ($loggedInUserId) {
            $query->where('user_id', $loggedInUserId)->select('movie_users.is_favorite');
        }])->get();

        $movies = $movies->map(function ($movie) {
            $movie->is_favorite = $movie->users->isNotEmpty() ? $movie->users[0]->pivot->is_favorite : false;
            return $movie;
        });

        return response()->json([
            'user' => $user,
            'movies' => $movies,
        ]);
    }

    public function addMovieToUser($userId, $movieId)
    {
        $user = User::find($userId);
        $existingMovies = $user->movies()->pluck('movies.id')->toArray();

        if (!in_array($movieId, $existingMovies)) {
            $user->movies()->attach($movieId, ['is_favorite' => true]);

            $attachedMovie = $user->movies()->where('movies.id', $movieId)->first();
            $isFavorite = $attachedMovie ? $attachedMovie->pivot->is_favorite : null;

            return response()->json([
                'message' => 'Movie added to user',
                'is_favorite' => $isFavorite,
            ], 200);
        }
    }

    public function deleteMovieFromUser($userId, $movieId)
    {
        $user = User::find($userId);
        $existingMovies = $user->movies()->pluck('movies.id')->toArray();

        if (in_array($movieId, $existingMovies)) {
            $user->movies()->detach($movieId);
            $user->movies()->updateExistingPivot($movieId, ['is_favorite' => false]);

            $updatedMovie = $user->movies()->find($movieId);
            $isFavorite = $updatedMovie ? $updatedMovie->pivot->is_favorite : null;
            $newMovies = $user->movies()->get();

            return response()->json(['message' => 'Movie deleted from user', 'is_favorite' => $isFavorite, 'new_movies' => $newMovies], 200);
        }

        return response()->json(['message' => 'Movie not found or not associated with the user'], 404);
    }

    public function filter(Request $request)
    {
        $query = Movies::with(['actors', 'directors', 'genres']);

        if ($request->has('release_year_min') && $request->has('release_year_max')) {
            $minYear = intval($request->input('release_year_min'));
            $maxYear = intval($request->input('release_year_max'));
            $query->whereBetween('release_year', [$minYear, $maxYear]);
        }

        if ($request->has('rating_min') && $request->has('rating_max')) {
            $minRating = floatval($request->input('rating_min'));
            $maxRating = floatval($request->input('rating_max'));
            $query->whereBetween('rating', [$minRating, $maxRating]);
        }

        $movies = $query->get();

        return response()->json([
            'success' => true,
            'data' => $movies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $movie = new Movies();
        $movie->title = $request->input('title');
        $movie->release_year = $request->input('release_year');
        $movie->rating = $request->input('rating');
        $movie->save();

        return response()->json([
            'message' => 'Movie created successfully',
            'movie' => $movie
        ], 201);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $movies = Movies::with(['actors', 'directors'])->where('title', 'LIKE', '%' . $query . '%')->get();

        return response()->json([
            'success' => true,
            'data' => $movies
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movies  $movie
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Movies $movie)
    {
        $movie->title = $request->input('title');
        $movie->release_year = $request->input('release_year');
        $movie->rating = $request->input('rating');
        $movie->save();

        return response()->json([
            'message' => 'Movie updated successfully',
            'movie' => $movie
        ]);
    }

    public function destroy(Movies $movie)
    {
        $movie->delete();

        return response()->json([
            'success' => true,
            'message' => 'Movie deleted successfully'
        ]);
    }

    public function restore($id)
    {
    $movie = Movies::withTrashed()->findOrFail($id);

    if ($movie->trashed()) {
        $movie->restore();
        return response()->json([
            'success' => true,
            'message' => 'Movie restored successfully'
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Movie is not deleted'
        ]);
    }
    }
}
