<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;

class RegisterController extends Controller
{
    public function __construct()
    {
        $this->middleware(['guest']);
    }

    public function register(Request $request)
    {
        $userRole = Role::where('name', 'WRITER')->first()->id;// user role

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'username' => 'max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|confirmed',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response(['status'=>'error','message'=>$errors]);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'role_id' => $userRole,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'status' => 'success',
            'message' => 'User successfully created',
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
}
