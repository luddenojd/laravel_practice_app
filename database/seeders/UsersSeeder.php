<?php

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
      ],
      [
          'name' => 'Liam Eriksson',
          'email' => 'liam@example.com',
          'password' => bcrypt('password123'),
      ],
      [
          'name' => 'Saga Lindgren',
          'email' => 'saga@example.com',
          'password' => bcrypt('password123'),
      ],
      [
          'name' => 'Oscar Nilsson',
          'email' => 'oscar@example.com',
          'password' => bcrypt('password123'),
      ],
      [
          'name' => 'Ella Svensson',
          'email' => 'ella@example.com',
          'password' => bcrypt('password123'),
      ],
  ];

    foreach ($users as $user) {
      User::create($user);
    }
  }
}
