<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Genres;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Mystery', 'Feelgood'];

        foreach ($genres as $genre) {
            Genres::create(['title' => $genre]);
        }
    }
}
