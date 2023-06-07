<?php

use Illuminate\Database\Seeder;
use App\Models\Directors;

class DirectorsSeeder extends Seeder
{
  public function run()
  {
    $directors = [
      [
          'name' => 'Frank Darabont',
          'date_of_birth' => '1959-01-28',
      ],
      [
          'name' => 'Francis Ford Coppola',
          'date_of_birth' => '1939-04-07',
      ],
      [
          'name' => 'Francis Ford Coppola',
          'date_of_birth' => '1939-04-07',
      ],
      [
          'name' => 'Christopher Nolan',
          'date_of_birth' => '1970-07-30',
      ],
      [
          'name' => 'Sidney Lumet',
          'date_of_birth' => '1924-06-25',
      ],
      [
          'name' => 'Steven Spielberg',
          'date_of_birth' => '1946-12-18',
      ],
      [
          'name' => 'Peter Jackson',
          'date_of_birth' => '1961-10-31',
      ],
      [
          'name' => 'Quentin Tarantino',
          'date_of_birth' => '1963-03-27',
      ],
      [
          'name' => 'Sergio Leone',
          'date_of_birth' => '1929-01-03',
      ],
      [
          'name' => 'David Fincher',
          'date_of_birth' => '1962-08-28',
      ],
  ];

    foreach ($directors as $director) {
      Directors::create($director);
    }
  }
}
