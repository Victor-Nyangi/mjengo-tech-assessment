<?php

namespace App\Policies;
use App\Models\Role;


use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view all users.
     */
    public function viewAll(User $user)
    {
        $adminRole = Role::where('name', 'ADMIN')->first()->id;
        return $user->role_id === $adminRole;
    }


    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user)
    {
        $adminRole = Role::where('name', 'ADMIN')->first()->id;
        return $user->role_id === $adminRole;
    }

}
