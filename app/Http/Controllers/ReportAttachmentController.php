<?php

namespace App\Http\Controllers;

use App\Models\Report;
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

    public function updateStatus(Request $request){
        $report = Report::find($request->id);
        $report->status = $request->status;
        $success = $report->save();

        if($success){
            return redirect()->back()->with('success','Successfully updated status!');
        }

        return redirect()->back()->with('error','Something went wrong please try again later!');
    }
}
