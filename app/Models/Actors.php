<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Actors extends Model
{
    use SoftDeletes;

    use HasFactory;

    protected $fillable = ['name', 'date_of_birth'];

    protected $dates = ['deleted_at'];

    public function movies()
    {
        return $this->belongsToMany(Movies::class, 'movie_actors', 'actor_id', 'movie_id');
    }
}
