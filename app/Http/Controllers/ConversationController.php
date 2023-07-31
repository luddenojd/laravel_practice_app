<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
  public function index()
  {
      $user = Auth::user();

      $conversations = Conversation::whereHas('user', function ($query) use ($user) {
          $query->where('user_id', $user->id)
          ->orWhere('receiver_id', $user->id);
      })
      ->join('users', 'conversations.user_id', '=', 'users.id')
      ->select('conversations.*', 'users.name as sender_name')
      ->get();

      return response()->json($conversations);
  }

  public function sendMessage(Request $request)
  {
    $user = Auth::user();
    $receiver = $request->input('receiver_id');
    $message = $request->input('message');

    $new_message = new Conversation();
    $new_message->user_id = $user->id;
    $new_message->receiver_id = $receiver;
    $new_message->message = $message;
    $new_message->save();

    $conversations = Conversation::whereHas('user', function ($query) use ($user) {
        $query->where('user_id', $user->id)
        ->orWhere('receiver_id', $user->id);
    })
    ->join('users', 'conversations.user_id', '=', 'users.id')
    ->select('conversations.*', 'users.name as sender_name')
    ->orderBy('created_at', 'asc')
    ->get();

    return response()->json($conversations);

  }

  public function readMessage(Request $request)
  {
      $read = $request->input('is_read');
      $messageId = $request->input('message_id');

      $conversation = Conversation::find($messageId);

      $conversation->is_read = $read;
      $conversation->save();

      return response()->json([
          'message' => 'Conversation has been read',
      ]);
  }
}

?>
