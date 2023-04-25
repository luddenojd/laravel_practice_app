<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movies extends Model
{
    use SoftDeletes;

    use HasFactory;

    protected $dates = ['deleted_at'];

    protected $fillable = ['title', 'description', 'image', 'year', 'director_id'];

    public function actors()
    {
        return $this->belongsToMany(Actors::class, 'movieactors', 'movie_id', 'actor_id');
    }

    public function directors()
    {
        return $this->belongsToMany(Directors::class, 'movie_directors', 'movie_id', 'director_id');
    }
}
