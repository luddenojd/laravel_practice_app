<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersSeeder extends Seeder
{
  public function run()
  {
    $users = [
      [
          'name' => 'Elsa Andersson',
          'email' => 'elsa@example.com',
          'password' => bcrypt('password123'),
          'bg_color' => '#FFFFFF',
          'birthdate' => '1995-05-23',
          'description' => 'Om mig'
      ],
      [
          'name' => 'Liam Eriksson',
          'email' => 'liam@example.com',
          'password' => bcrypt('password123'),
          'bg_color' => '#FFFFFF',
          'birthdate' => '1995-05-23',
          'description' => 'Om mig'
      ],
      [
          'name' => 'Saga Lindgren',
          'email' => 'saga@example.com',
          'password' => bcrypt('password123'),
          'bg_color' => '#FFFFFF',
          'birthdate' => '1995-05-23',
          'description' => 'Om mig'
      ],
      [
          'name' => 'Oscar Nilsson',
          'email' => 'oscar@example.com',
          'password' => bcrypt('password123'),
          'bg_color' => '#FFFFFF',
          'birthdate' => '1995-05-23',
          'description' => 'Om mig'
      ],
      [
          'name' => 'Ella Svensson',
          'email' => 'ella@example.com',
          'password' => bcrypt('password123'),
          'bg_color' => '#FFFFFF',
          'birthdate' => '1995-05-23',
          'description' => 'Om mig'
      ],
  ];

    foreach ($users as $user) {
      User::create($user);
    }
  }
}
