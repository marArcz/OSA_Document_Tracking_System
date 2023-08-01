<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    //
    public function delete(Request $request)
    {
        $announcement = Announcement::where('id', $request->id)->firstOrFail();
        $announcement->delete();

        return redirect()->back()->with('success', "Successfully deleted!");
    }

    public function create(Request $request)
    {
        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $request->image,
        ]);

        return redirect()->intended(route('super-admin.announcements'))->with('success', "Successfully added new accouncement!");
    }

    public function edit(Request $request)
    {
        $announcement = Announcement::find($request->id);

        $announcement->title = $request->title;
        $announcement->content = $request->content;
        $announcement->image = $request->image;

        $announcement->save();

        return redirect()->intended(route('super-admin.announcements'))->with('success', "Successfully updated accouncement!");
    }
}
