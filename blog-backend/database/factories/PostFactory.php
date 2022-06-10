<?php

namespace Database\Factories;
use App\Models\Post;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Post::class;


    public function definition()
    {
        $role_id = Role::where('name', 'WRITER')->first()->id;
        $min = User::where('role_id', $role_id)->min('id');
        $max = User::where('role_id', $role_id)->max('id');

        return [
            'slug' => $this->faker->sentence(6),
            'title' => $this->faker->sentence(6),
            'excerpt' => $this->faker->sentence(15),
            'user_id'=>rand($min,$max),
            'body' => $this->faker->sentence(50),
        ];
    }
}
