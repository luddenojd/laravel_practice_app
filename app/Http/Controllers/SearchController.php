<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actors;
use App\Models\Movies;
use App\Models\Directors;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        // Search in Actors
        $actors = Actors::with('movies')->where('name', 'LIKE', '%' . $query . '%')->get();

        // Search in Movies
        $movies = Movies::with(['actors', 'directors'])->where('title', 'LIKE', '%' . $query . '%')->get();

        // Search in Directors
        $directors = Directors::with('movies')->where('name', 'LIKE', '%' . $query . '%')->get();

        return response()->json([
            'success' => true,
            'actors' => $actors,
            'movies' => $movies,
            'directors' => $directors
        ]);
    }
}
