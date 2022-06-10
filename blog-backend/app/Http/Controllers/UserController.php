<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $users = User::latest()->with(['user', 'likes'])->paginate(20);
        $users = User::all();
        $this->authorize('viewAll', Auth::user());

        if($users){
            return response()->json([
                'status'=>'success',
                'users' => $users,
                'message'=>'',
            ]);
        }

        return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
    }


    private function validateRole($user_id) {
        $adminRole = Role::where('name', 'ADMIN')->first()->id;
        $writerRole = Role::where('name', 'WRITER')->first()->id;
        if($user_id == $adminRole){
            return True;
        }
        if($user_id == $writerRole){
            return False;
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user_id = Auth::user()->id;
        $user =  User::find($id);
        $posts = Post::where('user_id', $id)->with(['user', 'likes'])->get();


        if($user){
            return response()->json([
                'status'=>'success',
                'user'=>$user,
                'posts' => $posts,
                'message'=>'',
            ]);
        }
        // if($this->validateRole($user_id)) {
        //     if($user){
        //             return response()->json([
        //                 'status'=>'success',
        //                 'user'=>$user,
        //                 'message'=>'As Admin',
        //             ]);
        //         }
        //     }
        //     else {
        //         if($user && $user_id == $user->id) {
        //             return response()->json([
        //                 'status'=>'success',
        //                 'user'=>$user,
        //                 'message'=>'As self',
        //             ]);
        //         }
        //     }

        return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
    }


    public function destroy(User $user)
    {
        $this->authorize('delete', Auth::user());

        // $this->authorize('delete', $user);

        if($user->delete()){
            return response()->json([
                'status'=>'success',
                'message'=>'Delete Succesfull',
            ]);        }
        else{
            return response()->json(['status'=>'info','message'=>'User not Found.']);
        }
        return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required|max:55',
        //     'username' => 'required|max:55',
        //     'email' => 'required|email|max:100'
        // ]);

        // if ($validator->fails()) {Fderr
        //     $errors = $validator->errors()->all();
        //     return response(['status'=>'error','message'=>$errors]);
        // }



        $user_id = Auth::user()->id;
        $user =  User::find($id);
        // $user->update($request->all());
        if(User::where(['id'=>$id])->update($request->only(['name', 'username', 'email'])))
            {
        if($this->validateRole($user_id)) {

                return response()->json([
                        'status'=>'success',
                        'users' => $user,
                        'message'=>'Update Succesfull',
                    ]);

            }
            else {
                if($user_id == $user->id) {
                    return response()->json([
                        'status'=>'success',
                        'users' => $user,
                        'message'=>'Profile updated',
                    ]);
                }
            }
                return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
    }
}

     /**
     * Search for a name
     *
     * @param  str  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        $user= User::where('name', 'like', '%'.$name.'%')->get();
        if($user) {
            return response()->json([
                'status'=>'success',
                'users' => $user,
                'message'=>'',
            ]);
        }
        else {
            return response()->json([
                'status'=>'info',
                'message'=>'User Not Found',
            ]);
        }
        return response()->json(['status'=>'error','message'=>'Technical error ocurred , contact administrator.']);
    }
}
