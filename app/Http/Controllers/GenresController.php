<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genres;

class GenresController extends Controller
{
    public function index()
    {
        $genres = Genres::with('movies')->get();

        return response()->json([
            'success' => true,
            'data' => $genres
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255'
        ]);

        $genre = Genres::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $genre
        ]);
    }

    public function addGenreToMovie($movieId, $genreId)
    {
        $genre = Genres::find($genreId);
        $genre->movies()->attach($movieId);
    }
}
