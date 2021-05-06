<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    protected $table = 'todolist';
    protected $attributes = [
        'completed' => false,
    ];
    protected $casts = [
        'picture' => 'array',
    ];
    protected $connection = 'pgsql';
    use HasFactory;
}
