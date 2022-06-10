<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        $adminRole = Role::where('name', 'ADMIN')->first()->id;

        $users = [
            [
                'name' => 'Victor Gichui',
                'email' => 'gichuivictor@gmail.com',
                'username' => 'Vic_G',
                'password' => Hash::make('gichuivictor@gmail.com'),
                'role_id' =>$adminRole,
                'updated_at'=>date("Y-m-d h:i:s"),
                'created_at'=>date("Y-m-d h:i:s")
            ]

        ];

        User::insert($users);

    }
}
