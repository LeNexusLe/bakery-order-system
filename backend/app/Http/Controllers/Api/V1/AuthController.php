<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['required', 'string', 'max:30'],
            'password' => ['required', 'string', 'min:8', 'regex:/\d/',],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
            'role' => 'CLIENT',
        ]);

        $token = Auth::guard('api')->login($user);

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => $this->userPayload($user),
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required','email'],
            'password' => ['required','string'],
        ]);

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::guard('api')->user();

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function me()
    {
        $user = Auth::guard('api')->user();

        return response()->json($this->userPayload($user));
    }

    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Logged out']);
    }

    public function updateMe(Request $request)
    {
        $user = Auth::guard('api')->user();

        $data = $request->validate(
            [
                'name' => ['sometimes','required','string','max:255'],
                'last_name' => ['sometimes','required','string','max:255'],
                'phone' => ['sometimes','required','string','max:30'],
                'email' => ['required','email','max:255','unique:users,email,' . $user->id],
                'password' => ['sometimes','required','string','min:8','regex:/\d/','confirmed'],
            ],
            [
                'password.min' => 'Hasło musi mieć minimum 8 znaków.',
                'password.regex' => 'Hasło musi zawierać przynajmniej jedną cyfrę.',
                'password.confirmed' => 'Hasła muszą być takie same.',
            ]
        );

        if (array_key_exists('password', $data)) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
        $user->refresh();

        return response()->json($this->userPayload($user));
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
        ];
    }
}
