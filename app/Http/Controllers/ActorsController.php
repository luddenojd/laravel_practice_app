<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actors;

class ActorsController extends Controller
{
    public function index()
    {
        $actors = Actors::with('movies')->get();

        return response()->json([
            'success' => true,
            'data' => $actors
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'date_of_birth' => 'required|max:255',
        ]);

        $actor = Actors::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $actor
        ]);
    }

    public function show(Actors $actor)
    {
        return response()->json([
            'success' => true,
            'data' => $actor
        ]);
    }

    public function update(Request $request, Actors $actor)
    {
        $request->validate([
            'name' => 'required|max:255',
            'date_of_birth' => 'required|max:255',
        ]);

        $actor->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $actor
        ]);
    }

    public function search(Request $request)
    {
    $query = $request->input('query');
    $actors = Actors::with('movies')->where('name', 'LIKE', '%' . $query . '%')->get();

    return response()->json([
        'success' => true,
        'data' => $actors
    ]);
    }

    public function destroy(Actors $actor)
    {
        $actor->delete();

        return response()->json([
            'success' => true,
            'message' => 'Actor deleted successfully'
        ]);
    }

    public function restore($id)
    {
    $actor = Actors::withTrashed()->findOrFail($id);

    if ($actor->trashed()) {
        $actor->restore();
        return response()->json([
            'success' => true,
            'message' => 'Actor restored successfully'
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Actor is not deleted'
        ]);
    }
    }
}
