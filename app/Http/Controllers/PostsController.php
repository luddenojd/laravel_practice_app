<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Posts::with(['user', 'likes', 'comments' => function ($query) {
            $query->with('user');
        }])
        ->orderByDesc('created_at')
        ->get();

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $post = new Posts();
        $post->content = $request->input('content');
        $post->user_id = $request->input('user_id');

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }

            $file = $request->file('image');
            $path = $file->store('post_pictures', 'public');
            $post->image = $path;
        }

        $post->save();

        return response()->json($post);

    }
}
