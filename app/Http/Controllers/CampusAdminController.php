<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class CampusAdminController extends Controller
{
    //

    public function create(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'campus_id' => 'required',
        ]);

        $campus_admin = User::create([
            'email' => $request->email,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'campus_id' => $request->campus_id,
        ]);

        $campus_admin->addRole('admin');

        return redirect()->intended(route('admin.admins'))->with('success','Successfully added!');
    }
}
