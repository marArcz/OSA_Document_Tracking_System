<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    use HasFactory;

    protected $with = ['unitHead','attachments'];

    protected $fillable = [
        'user_id',
        'submission_bin_id',
        'status',
        'is_submitted'
    ];

    public function attachments(){
        return $this->hasMany(ReportAttachment::class,'report_id','id')->orderByDesc('id');
    }

    public function unitHead(){
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function comments(){
        return $this->hasMany(ReportComment::class,'report_id','id');
    }

    public function submission_bin() :BelongsTo
    {
        return $this->belongsTo(SubmissionBin::class,'submission_bin_id','id');
    }
}
