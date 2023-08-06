<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'program',
        'performance',
        'accomplishment',
        'remarks',
        'image',
        'user_id',
        'submission_bin_id',
        'signature'
    ];
}
