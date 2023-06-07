<?php

namespace Database\Seeders;

use ActorsSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(GenreSeeder::class);
        $this->call(MovieTableSeeder::class);
        $this->call(ActorsSeeder::class);
        $this->call(DirectorsSeeder::class);
        $this->call(UsersSeeder::class);

    }
}
