<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genres extends Model
{
    use HasFactory;

    protected $fillable =['title'];

    public function movies()
    {
        return $this->belongsToMany(Movies::class, 'movie_genres', 'movie_id', 'genre_id');
    }
}
