<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FriendsController extends Controller
{
    public function index()
    {
        $friends = User::with('friends')->get();

        return response()->json($friends);
    }

    public function myFriends()
    {
        $user = Auth::user();
        $friends = $user->friends;

        return response()->json($friends);
    }

    public function myFriendRequests()
    {
        $user = Auth::user();
        $friendRequests = Friend::where('friend_id', $user->id)
            ->with('user')
            ->join('users', 'friends.user_id', '=', 'users.id')
            ->select('friends.*', 'users.name as friend_name')
            ->get();

        return response()->json($friendRequests);
    }

    public function acceptFriendRequest(Request $request)
    {
        $user = Auth::user();
        $friendRequestId = $request->input('friend_request_id');

        // Check if the friend request exists
        $friendRequest = Friend::find($friendRequestId);
        if (!$friendRequest) {
            return response()->json(['message' => 'Friend request not found'], 404);
        }

        // Check if the friend request belongs to the authenticated user
        if ($friendRequest->friend_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Create a new friendship entry for the authenticated user
        $user->friends()->attach($friendRequest->user_id);

        // Create a new friendship entry for the friend being added
        $friend = User::find($friendRequest->user_id);
        $friend->friends()->attach($user->id);

        // Delete the friend request
        $friendRequest->delete();

        return response()->json(['message' => 'Friend request accepted successfully'], 200);
    }

    public function sendFriendRequest(Request $request)
    {
        $user = Auth::user();
        $friendId = $request->input('friend_id');

        // Check if the friend exists
        $friend = User::find($friendId);
        if (!$friend) {
            return response()->json(['message' => 'Friend not found'], 404);
        }

        // Check if the friend request already exists
        if (Friend::where('user_id', $user->id)->where('friend_id', $friendId)->exists()) {
            return response()->json(['message' => 'Friend request already sent'], 400);
        }

        // Create a new friend request
        $friendRequest = Friend::create([

            'user_id' => $user->id,
            'friend_id' => $friendId,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Friend request sent successfully'], 200);
    }
}
