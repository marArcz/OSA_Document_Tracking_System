<?php

namespace App\Http\Controllers;

use App\Events\SubmissionBinCreated;
use App\Mail\NewSubmissionBinNotif;
use App\Models\SubmissionBin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubmissionBinController extends Controller
{
    //
    public function create(Request $request)
    {
        $bin = SubmissionBin::create([
            'title' => $request->title,
            'instruction' => $request->instruction,
            'deadline_date' => $request->deadline_date,
            'deadline_time' => $request->deadline_time,
        ]);

        // SubmissionBinCreated::dispatch($bin);
        $users = User::select('email')->whereHasRole(['admin', 'unit_head'])->get();

        foreach ($users as $recipient) {
            Mail::to($recipient)->queue(new NewSubmissionBinNotif($bin));
        }

        return redirect()->intended(route('admin.submission_bins'))->with('succes', 'Successfully created!');
    }

    public function edit(Request $request)
    {
        $submission_bin = SubmissionBin::find($request->id);
        $submission_bin->title = $request->title;
        $submission_bin->instruction = $request->instruction;
        $submission_bin->deadline_date = $request->deadline_date;
        $submission_bin->deadline_time = $request->deadline_time;
        $submission_bin->save();
        return redirect()->intended(route('admin.submission_bins'))->with('succes', 'Successfully saved changes!');
    }

    public function delete(Request $request)
    {
        $submission_bin = SubmissionBin::where('id', $request->id)->firstOrFail();
        $submission_bin->delete();

        return response()->json(['success' => true]);
    }
}
