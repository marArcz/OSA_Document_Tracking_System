<?php

namespace App\Http\Controllers;

use App\Models\SubmissionBin;
use Illuminate\Http\Request;

class SubmissionBinController extends Controller
{
    //
    public function create(Request $request){
        SubmissionBin::create([
            'title'=>$request->title,
            'instruction'=>$request->instruction,
            'deadline_date'=>$request->deadline_date,
            'deadline_time'=>$request->deadline_time,
        ]);

        return redirect()->intended(route('admin.submission_bins'))->with('succes','Successfully created!');
    }

    public function edit(Request $request){
        SubmissionBin::create([
            'title'=>$request->title,
            'instruction'=>$request->instruction,
            'deadline_date'=>$request->deadline_date,
            'deadline_time'=>$request->deadline_time,
        ]);

        return redirect()->intended(route('admin.submission_bins'))->with('succes','Successfully created!');
    }

    public function delete(Request $request){
        $submission_bin = SubmissionBin::where('id',$request->id)->firstOrFail();
        $submission_bin->delete();

        return response()->json(['success'=>true]);
    }

}
