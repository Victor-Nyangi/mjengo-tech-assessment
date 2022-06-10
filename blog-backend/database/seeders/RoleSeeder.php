<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use Exception;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();

        DB::beginTransaction();
        try {

            $roles = [
                ['name'=>'ADMIN','updated_at'=>date("Y-m-d h:i:s"),'created_at'=>date("Y-m-d h:i:s")],
                ['name'=>'WRITER','updated_at'=>date("Y-m-d h:i:s"),'created_at'=>date("Y-m-d h:i:s")]
            ];

            Role::insert($roles);

            DB::commit();

        } catch (Exception $e) {
            echo $e->getMessage();

            DB::rollBack();
        }
    }
}
