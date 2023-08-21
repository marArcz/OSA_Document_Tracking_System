<?php

namespace App\Http\Controllers;

use App\Events\NewCommentAdded;
use App\Models\ReportComment;
use Illuminate\Http\Request;

class ReportCommentController extends Controller
{
    /* API */
    public function get(Request $request)
    {
        $data['comments'] = ReportComment::where('submission_bin_id', $request->submission_bin_id)->where('unit_head_id', $request->unit_head_id)->get();
        return response()->json($data);
    }

    /* API */
    public function add(Request $request)
    {
        $comment = ReportComment::create([
            'user_id' => $request->user_id,
            'unit_head_id' => $request->unit_head_id,
            'submission_bin_id' => $request->submission_bin_id,
            'comment' => $request->comment,
            'is_removed' => false,
        ]);

        // NewCommentAdded::dispatch($comment);
        event(new NewCommentAdded($comment));

        return response()->json(['comment' => $comment]);
    }
}
