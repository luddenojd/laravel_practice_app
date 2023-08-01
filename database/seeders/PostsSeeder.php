<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Posts;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'user_id' => 1,
                'content' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            ],
            [
                'user_id' => 2,
                'content' => "Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
            ],
            [
                'user_id' => 3,
                'content' => "Nemo enim ipsam voluptatem quia voluptas sit aspernatur."
            ],
            [
                'user_id' => 4,
                'content' => "Neque porro quisquam est, qui dolorem ipsum quia dolor."
            ],
            [
                'user_id' => 5,
                'content' => "At vero eos et accusamus et iusto odio dignissimos ducimus."
            ],
        ];

        foreach ($posts as $post) {
            Posts::create($post);
        }
    }
}
