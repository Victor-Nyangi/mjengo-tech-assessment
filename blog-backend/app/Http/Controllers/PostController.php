<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Post;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth'])->only(['store', 'destroy']);
    }


    // private function validateRole($user_id) {
    //     $adminRole = Role::where('name', 'ADMIN')->first()->id;
    //     $writerRole = Role::where('name', 'WRITER')->first()->id;
    //     if($user_id == $adminRole){
    //         return True;
    //     }
    //     if($user_id == $writerRole){
    //         return False;
    //     }
    // }

    public function index()
    {
        $posts = Post::with(['user', 'likes'])->latest()->get();

        if($posts){
            return response()->json([
                'status'=>'success',
                'posts' => $posts,
                'message'=>'',
            ]);
        }
        else {
            return response()->json([
                'status'=>'info',
                'message'=>'No Posts found',
            ]);
        }

        return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);

    }

    public function show($id)
    {

        if(Post::where('id',$id)){
            return response()->json([
                'status'=>'success',
                'post' => Post::where('id',$id)->with(['user'])->first(),
                'message'=>'',
            ]);
        }
        else {
            return response()->json([
                'status'=>'info',
                'message'=>'Post not found',
            ]);
        }
    }


    public function update(Request $request, Post $post)
    {

        // Policy that restricts the delete action to the Writer of the post
        // $this->authorize('update', $post);
        if (!$post->exists()) {
            return response()->json(['status'=>'info','message'=>'Post not found.']);
        }

        if ($post->update($request->all())) {

        // $post->update($request->all());
        // if($post){
            return response()->json([
                'status'=>'success',
                'post' => $post,
                'message'=>'',
            ]);}
        // }
        // else {
        //     return response()->json([
        //         'status'=>'info',
        //         'message'=>'Update unsuccessful',
        //     ]);
        // }
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'body' => 'required',
            'title' => 'required',
            'excerpt' => 'required',
            'slug' => 'required'
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response(['status'=>'error','message'=>$errors]);
        }

        if($request->user()->posts()->create($request->only(['title','excerpt','body', 'slug']))) {
            return response()->json([
                'status'=>'success',
                'message'=>'Post added successfully.',
            ]);
        }
        else {
            return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
        }
    }

    public function destroy(Post $post)
    {
        // Policy that restricts the delete action to the Writer of the post
        $this->authorize('delete', $post);

        if($post->delete()){
            return response()->json([
                'status'=>'success',
                'message'=>'Post has been deleted.',
            ]);
        }
        else{
            return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
        }
    }

     public function search($title)
    {
        if(Post::where('title', 'like', '%'.$title.'%')->get()){
            return response()->json([
                'status'=>'success',
                'posts' => Post::where('title', 'like', '%'.$title.'%')->get(),
                'message'=>'',
            ]);
        }
        else{
            return response()->json(['status'=>'info','message'=>'Post was not found.']);
        }
        // $posts = Post::where(function($query) use ($q) {
        //     $query->where('title', 'LIKE', '%'.$q.'%')
        //         ->orWhere('slug', 'LIKE', '%'.$q.'%')
        //         ->orWhere('body', 'LIKE', '%'.$q.'%');
        // })->get();
    }
}
