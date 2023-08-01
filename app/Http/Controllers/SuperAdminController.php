<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Reminder;
use App\Models\SuperAdmin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperAdminController extends Controller
{
    /* 
        shows login form
    */
    public function index()
    {
        /* 
            check if no admin account exists yet.
        */
        $hasAdmin = SuperAdmin::all(['id'])->count() > 0;

        if (!$hasAdmin) {
            // if no admin redirect to register
            return redirect()->intended(route('super-admin.register'));
        }

        return Inertia::render('SuperAdmin/Auth/SignIn');
    }

    /* 
        shows registration form
    */
    public function register()
    {
        return Inertia::render('SuperAdmin/Auth/Register');
    }

    /* 
        announcements page
    */
    public function announcements(){
        $data['announcements'] = Announcement::all();
        return Inertia::render('SuperAdmin/Announcements',$data);
    }

    public function create_announcement(){
        return Inertia::render('SuperAdmin/CreateAnnouncement');
    }
    public function edit_announcement(Request $request){
        $data['announcement'] = Announcement::find($request->id);
        return Inertia::render('SuperAdmin/EditAnnouncement',$data);
    }

    /* 
        reminders page
    */
    public function reminders(){
        $data['reminders'] = Reminder::all();
        return Inertia::render('SuperAdmin/Reminders',$data);
    }

    public function create_reminder(){
        return Inertia::render('SuperAdmin/CreateReminder');
    }
    public function edit_reminder($id){
        $data['reminder'] = Reminder::find($id);
        return Inertia::render('SuperAdmin/EditReminder',$data);
    }


    /* 
     *  Accessed from api endpoint
     *  Check if email and phone exist
     *  Recieves by post method
     */
    public function checkEmailAndPhone(Request $request)
    {
        $request->validate([
            'email' => 'required|unique:super_admins,email',
            'phone' => 'required|unique:super_admins,phone|min:11|max:12'
        ]);

        return response()->json(['success' => true], 200);
    }
    public function dashboard()
    {
        return Inertia::render('SuperAdmin/Dashboard');
    }
}
