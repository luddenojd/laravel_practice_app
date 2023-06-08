<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Actors;

class ActorsSeeder extends Seeder
{
  public function run()
  {
    $actors = [
      [
          'name' => 'Tim Robbins',
          'date_of_birth' => '1958-10-16',
      ],
      [
          'name' => 'Marlon Brando',
          'date_of_birth' => '1924-04-03',
      ],
      [
          'name' => 'Al Pacino',
          'date_of_birth' => '1940-04-25',
      ],
      [
          'name' => 'Christian Bale',
          'date_of_birth' => '1974-01-30',
      ],
      [
          'name' => 'Henry Fonda',
          'date_of_birth' => '1905-05-16',
      ],
      [
          'name' => 'Liam Neeson',
          'date_of_birth' => '1952-06-07',
      ],
      [
          'name' => 'Viggo Mortensen',
          'date_of_birth' => '1958-10-20',
      ],
      [
          'name' => 'John Travolta',
          'date_of_birth' => '1954-02-18',
      ],
      [
          'name' => 'Clint Eastwood',
          'date_of_birth' => '1930-05-31',
      ],
      [
          'name' => 'Brad Pitt',
          'date_of_birth' => '1963-12-18',
      ],
  ];

    foreach ($actors as $actor) {
      Actors::create($actor);
    }
  }
}
