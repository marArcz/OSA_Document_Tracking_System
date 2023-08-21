<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportAttachment;
use App\Models\User;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /* API */
    public function all(Request $request)
    {
        $campus_id = $request->campus_id;
        $submission_bin_id = $request->submission_bin_id;
        $unit_heads = User::select('id')->where('campus_id',$campus_id);
        $data['reports'] = Report::whereIn('user_id', $unit_heads)->where('submission_bin_id', $submission_bin_id)->where('is_submitted',true)->get();

        return response()->json($data);
    }
    /* API */
    public function getApproved(Request $request)
    {
        $campus_id = $request->campus_id;
        $submission_bin_id = $request->submission_bin_id;
        $unit_heads = User::select('id')->where('campus_id',$campus_id);
        $data['reports'] = Report::whereIn('user_id', $unit_heads)->where('submission_bin_id', $submission_bin_id)->where('is_submitted',true)->where('status','Approved')->get();

        return response()->json($data);
    }

    public function addReport(Request $request)
    {
        $bin_id = $request->submission_bin_id;
        $user_id = $request->user_id;

        $report = Report::where('submission_bin_id', $bin_id)->where('user_id', $user_id)->first();
        // if no report created yet
        if (!$report) {
            // create report
            $report = Report::create([
                'user_id' => $user_id,
                'submission_bin_id' => $bin_id,
            ]);
        }
        // save report to server
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $file->move(public_path('reports'), $fileName);
        $fileUrl = "/reports/" .  $fileName;

        // create report attachment
        $attachment = ReportAttachment::create([
            'uri' => $fileUrl,
            'name' => $fileName,
            'report_id' => $report->id
        ]);

        return response()->json(['fileUrl' => $fileUrl, 'attachment' => $attachment]);
    }
    /* api */
    public function removeAttachment(Request $request)
    {
        $attachment_id = $request->id;
        $attachment = ReportAttachment::find($attachment_id);
        if ($attachment) {
            $attachment->delete();
        }

        return response()->json(['success' => true]);
    }

    public function submitReport(Request $request)
    {
        $user = $request->user();
        $report = Report::where('submission_bin_id', $request->submission_bin_id)->where('user_id', $user->id)->first();

        if ($report) {
            $report->is_submitted = true;
            if ($report->save()) {
                return redirect()->back()->with("success", 'Successfully submitted!');
            }
        }

        return redirect()->back()->with('error', 'Something went wrong please try again later!');
    }
    public function unSubmitReport(Request $request)
    {
        $user = $request->user();
        $report = Report::where('submission_bin_id', $request->submission_bin_id)->where('user_id', $user->id)->first();

        if ($report) {
            $report->is_submitted = false;
            if ($report->save()) {
                return redirect()->back();
            }
        }

        return redirect()->back()->with('error', 'Something went wrong please try again later!');
    }

    /* API */
    public function unit_heads(Request $request){
        $unit_heads = User::where('campus_id',$request->campus_id)->whereHasRole(['unit_head'])->get();
        return response()->json(['unitHeads'=> $unit_heads]);
    }
}
