<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genres;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = ['Action', 'Komedi', 'Drama', 'Skräck', 'Romance', 'Mysterium', 'Feelgood'];

        foreach ($genres as $genre) {
            Genres::create(['title' => $genre]);
        }
    }
}
