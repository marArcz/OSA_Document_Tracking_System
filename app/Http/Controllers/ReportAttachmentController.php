<?php

namespace App\Http\Controllers;

use App\Models\ReportAttachment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportAttachmentController extends Controller
{
    //

    public function view($id)
    {
        $data['file'] = ReportAttachment::with(['report'])->find($id);
        return Inertia::render('ViewFile', $data);
    }
}
