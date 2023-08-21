<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubmissionBin extends Model
{
    use HasFactory;
    protected $with = ['reports'];
    
    protected $fillable = [
        'status',
        'title',
        'instruction',
        'deadline_date',
        'deadline_time',
        'has_deadline'
    ];

    public function reports(){
        return $this->hasMany(Report::class,'submission_bin_id','id');
    }

}
