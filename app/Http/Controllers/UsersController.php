<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{
    public function index()
    {
        $activeUser = Auth::user();

        $users = User::where('id', '!=', $activeUser->id)
            ->with('friendRequests')
            ->get();

        $users = $users->map(function ($user) use ($activeUser) {
            $user->friends = $activeUser->friends->contains('id', $user->id);

            return $user;
        });

        return response()->json($users);
    }



    public function activeUser()
    {
        $user = Auth::user();

        return response()->json($user);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }


    // ...

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'profile_pic' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bg_color' => 'nullable|string|max:7',
            'font_color' => 'nullable|string|max:7',
            'birthdate' => 'nullable|date',
            'description' => 'nullable|string',
        ]);


        $user->fill($request->only([
            'name',
            'email',
            'password',
            'bg_color',
            'font_color',
            'birthdate',
            'description',
        ]));

        if ($request->hasFile('profile_pic')) {
            if ($user->profile_pic) {
                Storage::disk('public')->delete($user->profile_pic);
            }

            $file = $request->file('profile_pic');
            $path = $file->store('profile_pictures', 'public');
            $user->profile_pic = $path;
        }

        $user->save();

        return response()->json($user);
    }


    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
