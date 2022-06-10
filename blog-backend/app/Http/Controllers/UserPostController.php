<?php

namespace App\Http\Controllers;

use App\Models\User;
class UserPostController extends Controller
{
    public function index(User $user)
    {
        $posts = $user->posts()->with(['likes'])->get();
        if($posts) {
            return response()->json([
                'status'=>'success',
                'user'=>$user,
                'posts'=>$posts
            ]);
        }
        else {
            return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
        }
    }
}
