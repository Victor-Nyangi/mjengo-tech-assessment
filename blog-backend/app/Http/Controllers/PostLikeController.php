<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function store(Post $post, Request $request)
    {
        if ($post->likedBy($request->user())) {
            return response(['status'=>'error','message'=>'You have already liked this post']);
        }

        if($post->likes()->create([
            'user_id' => $request->user()->id,
        ])
        ){
        return response(['status'=>'success','message'=>'Thank you for liking the post']);

        }
        return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
    }

    public function destroy(Post $post, Request $request)
    {
        if($request->user()->likes()->where('post_id', $post->id)->delete()){

        return response(['status'=>'info','message'=>'You have disliked the post']);

        }
        return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
    }
}
