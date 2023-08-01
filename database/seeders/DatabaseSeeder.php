<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(GenreSeeder::class);
        $this->call(MoviesTableSeeder::class);
        $this->call(ActorsSeeder::class);
        $this->call(DirectorsSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(PostsSeeder::class);
    }
}
