<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportComment extends Model
{
    use HasFactory;

    protected $with = ['user'];

    protected $fillable = [
        'user_id',
        'comment',
        'is_removed',
        'unit_head_id',
        'submission_bin_id',
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
}
