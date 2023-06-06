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
        $movies = $user->movies()->with(['actors', 'directors', 'genres'])->get();
        return response()->json([
            'user' => $user,
            'movies' => $movies,
        ]);
    }

    public function getAllMovies(Request $request)
    {   $user = $request->user();
        $movies = Movies::with(['actors', 'directors', 'genres'])->get();

        return response()->json([
            'user' => $user,
            'movies' => $movies,
        ]);
    }

    public function addMovieToUser($userId, $movieId)
    {
        $user = User::find($userId);
        $user->movies()->attach($movieId);
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
