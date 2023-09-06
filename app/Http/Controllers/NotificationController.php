<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\NewCalendarEvent;
use App\Notifications\NewReportSubmitted;
use App\Notifications\NewSubmissionBin;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notification;

class NotificationController extends Controller
{
    //
    public function get(Request $request)
    {
        $user = User::find($request->id);
        if (!$user) {
            $data['notifications'] = [];
            $data['error'] = "User not found!";
        } else {
            $data['notifications'] = $user->unreadNotifications()->get();
        }
        return response()->json($data);
    }
    //
    public function general(Request $request)
    {
        $user = User::find($request->id);
        if (!$user) {
            $data['notifications'] = [];
            $data['error'] = "User not found!";
        } else {
            if ($user->hasRole('super_admin')) {
                $data['notifications'] = $user->unreadNotifications()->where('type', NewSubmissionBin::class)->get();
            } else if ($user->hasRole('admin')) {
                $data['notifications'] = $user->unreadNotifications()->where('type', NewReportSubmitted::class)->orWhere('type', NewSubmissionBin::class)->get();
            } else {
                // for unit heads
                $data['notifications'] = $user->unreadNotifications()->where('type', NewSubmissionBin::class)->get();
            }
        }
        return response()->json($data);
    }
    public function calendar(Request $request)
    {
        $user = User::find($request->id);
        if (!$user) {
            $data['notifications'] = [];
            $data['error'] = "User not found!";
        } else {
            $data['notifications'] = $user->unreadNotifications()
                ->where('type', NewCalendarEvent::class)
                ->get();
        }
        return response()->json($data);
    }


    public function open(Request $request)
    {
        $notification = $request->user()->Notifications()->find($request->id);
        if (!$notification) {
            return response(['message' => 'Not found', 'notification id: ' => $request->id], 404);
        }
        $notification->markAsRead();
        return redirect()->intended($notification->data['link']);
    }

    public function markAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();
        return response()->json(['success'=>true]);
    }
}
