<?php

namespace App\Http\Controllers;

use App\Models\Likes;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    public function index()
    {
        $likes = Likes::with('user')->get();

        return response()->json($likes);
    }

    public function store(Request $request)
    {
        $post_id = $request->input('post_id');
        $user_id = $request->input('user_id');

        $existing_like = Likes::where('post_id', $post_id)
                              ->where('user_id', $user_id)
                              ->first();

        if ($existing_like) {
            $existing_like->delete();
            return response()->json(['message' => 'Like removed']);
        } else {
            $like = new Likes();
            $like->post_id = $post_id;
            $like->user_id = $user_id;
            $like->save();
            return response()->json(['message' => 'Like added']);
        }
    }

}
