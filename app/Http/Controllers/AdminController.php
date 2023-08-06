<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Announcement;
use App\Models\Campus;
use App\Models\Classification;
use App\Models\Designation;
use App\Models\Reminder;
use App\Models\SubmissionBin;
use App\Models\SuperAdmin;
use App\Models\UnitHead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;


class AdminController extends Controller
{
    public function index()
    {
        /* 
            check if no admin account exists yet.
        */
        $hasAdmin = count(User::whereHasRole(['super_admin'])->get()) > 0;
        if (!$hasAdmin) {
            // if no admin redirect to register
            return redirect()->intended(route('admin.register'));
        }

        return Inertia::render('Admin/Auth/SignIn');
    }

    /* sign out user */
    public function signout()
    {
        Auth::guard('web')->logout();
        return redirect()->intended('/');
    }

    /* 
        shows registration form
    */
    public function register()
    {
        return Inertia::render('Admin/Auth/Register');
    }

    public function create(Request $request)
    {
        $type = $request->get('type');

        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);
        $user->addRole($type);

        // if($type == 'admin'){
        //     return redirect()->intended(route('admin.dashboard'));
        // }
        return redirect()->intended(route('admin.dashboard'));
    }

    /* admin panel pages */
    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }
    /* 
        announcements page
    */
    public function announcements()
    {
        $data['announcements'] = Announcement::orderByDesc('id')->get();
        return Inertia::render('Admin/Announcements', $data);
    }

    public function create_announcement()
    {
        return Inertia::render('Admin/CreateAnnouncement');
    }
    public function edit_announcement(Request $request)
    {
        $data['announcement'] = Announcement::find($request->id);
        return Inertia::render('Admin/EditAnnouncement', $data);
    }

    /* 
        reminders page
    */
    public function reminders()
    {
        $data['reminders'] = Reminder::all();
        return Inertia::render('Admin/Reminders', $data);
    }

    public function create_reminder()
    {
        return Inertia::render('Admin/CreateReminder');
    }
    public function edit_reminder($id)
    {
        $data['reminder'] = Reminder::find($id);
        return Inertia::render('Admin/EditReminder', $data);
    }

    /* Submission bin */
    public function submission_bins()
    {
        $data['submission_bins'] = SubmissionBin::orderByDesc('id')->get();
        return Inertia::render('Admin/SubmissionBins', $data);
    }

    public function create_submission_bin()
    {
        return Inertia::render('Admin/CreateSubmissionBin');
    }

    /* unit heads */
    public function unit_heads_profile(Request $request)
    {
        $data['campuses'] = Campus::all();
        $data['classifications'] = Classification::all();
        return Inertia::render('Admin/UnitHeads', $data);
    }

    /* api */
    public function unit_heads_by_designation(Request $request)
    {
        $designations = Designation::where('classification_id', $request->classification_id)->get();
        foreach ($designations as $key => $designation) {
            $designation['unit_heads'] = User::whereHasRole('unit_head')->where('campus_id', $request->campus_id)->where('designation_id', $designation->id)->get();
        }
        return response()->json(['designations' => $designations]);
    }

    public function create_unit_head(Request $request)
    {
        return Inertia::render('Admin/CreateUnitHead');
    }

    public function unit_heads_records(Request $request)
    {
        $data['unitHeads'] = User::with(['campus', 'designation'])->whereHasRole('unit_head')->get();
        return Inertia::render('Admin/UnitHeadRecord', $data);
    }

    public function admins(Request $request)
    {
        return Inertia::render('Admin/Admins');
    }

    public function getAdmins(Request $request)
    {
        $data['admins'] = User::with(['campus'])->whereHasRole('admin')->orderBy('campus_id')->get();
        return response()->json($data);
    }
    public function getAdminByCampus(Request $request)
    {
        $data['admins'] = User::with(['campus'])->where('campus_id', $request->campus_id)->whereHasRole('admin')->groupBy('campus_id')->get();
        return response()->json($data);
    }

    public function createAdmin(Request $request)
    {
        $data['campuses'] = Campus::all();
        return Inertia::render('Admin/CreateAdmin', $data);
    }

    public function editCampusAdmin(Request $request){
        $data['admin'] = User::where('id',$request->id)->whereHasRole('admin')->firstOrFail();
        $data['campuses'] = Campus::all();

        return Inertia::render('Admin/EditAdmin',$data);
    }
}
