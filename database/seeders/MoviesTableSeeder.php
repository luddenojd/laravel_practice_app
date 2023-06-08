<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movies;

class MoviesTableSeeder extends Seeder
{
    public function run()
    {
        $movies = [
            [
                'title' => 'The Shawshank Redemption',
                'release_year' => '1994',
                'rating' => '9.3',
            ],
            [
                'title' => 'The Godfather',
                'release_year' => '1972',
                'rating' => '9.2',
            ],
            [
                'title' => 'The Godfather: Part II',
                'release_year' => '1974',
                'rating' => '9.0',
            ],
            [
                'title' => 'The Dark Knight',
                'release_year' => '2008',
                'rating' => '9.0',
            ],
            [
                'title' => '12 Angry Men',
                'release_year' => '1957',
                'rating' => '8.9',
            ],
            [
                'title' => 'Schindler\'s List',
                'release_year' => '1993',
                'rating' => '8.9',
            ],
            [
                'title' => 'The Lord of the Rings: The Return of the King',
                'release_year' => '2003',
                'rating' => '8.9',
            ],
            [
                'title' => 'Pulp Fiction',
                'release_year' => '1994',
                'rating' => '8.8',
            ],
            [
                'title' => 'The Good, the Bad and the Ugly',
                'release_year' => '1966',
                'rating' => '8.8',
            ],
            [
                'title' => 'Fight Club',
                'release_year' => '1999',
                'rating' => '8.8',
            ],
        ];

        foreach ($movies as $movie) {
          Movies::create($movie);
      }
    }
}
