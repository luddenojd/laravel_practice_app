<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Directors;

class DirectorsController extends Controller
{
    public function index()
    {
        $directors = Directors::with('movies')->get();

        return response()->json([
            'success' => true,
            'data' => $directors
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'date_of_birth' => 'required|max:255',
        ]);

        $director = Directors::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $director
        ]);
    }

    public function show(Directors $director)
    {
        return response()->json([
            'success' => true,
            'data' => $director
        ]);
    }

    public function update(Request $request, Directors $director)
    {
        $request->validate([
            'name' => 'required|max:255',
            'date_of_birth' => 'required|max:255',
        ]);

        $director->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $director
        ]);
    }

    public function search(Request $request)
    {
    $query = $request->input('query');
    $directors = Directors::with('movies')->where('name', 'LIKE', '%' . $query . '%')->get();

    return response()->json([
        'success' => true,
        'data' => $directors
    ]);
    }

    public function destroy(Directors $director)
    {
        $director->delete();

        return response()->json([
            'success' => true,
            'message' => 'Director deleted successfully'
        ]);
    }

    public function restore($id)
    {
    $director = Directors::withTrashed()->findOrFail($id);

    if ($director->trashed()) {
        $director->restore();
        return response()->json([
            'success' => true,
            'message' => 'Director restored successfully'
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Director is not deleted'
        ]);
    }
    }
}
