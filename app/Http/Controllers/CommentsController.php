<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function index()
    {
        $comments = Comments::with('user')->get();

        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $post_id = $request->input('post_id');
        $user_id = $request->input('user_id');
        $content = $request->input('content');

        $comment = new Comments();

        $comment->post_id =$post_id;
        $comment->user_id = $user_id;
        $comment->content = $content;
        $comment->save();

        return response()->json($comment);

    }
}
