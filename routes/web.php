<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\CampusAdminController;
use App\Http\Controllers\CampusController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReminderController;
use App\Http\Controllers\SubmissionBinController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\UsersController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $hasAdmin = count(User::whereHasRole(['super_admin'])->get()) > 0;
    if (!$hasAdmin) {
        // if no admin redirect to register
        return redirect()->intended(route('admin.register'));
    }
    return Inertia::render('Welcome');
})->middleware(['guest']);

// super admin
Route::prefix('/admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/register', [AdminController::class, 'register'])->name('admin.register')->middleware('guest');
    Route::post('/create', [AdminController::class, 'create'])->name('admin.create')->middleware('guest');
});

Route::prefix('/admin')->middleware(['auth'])->group(function () {
    Route::get('/signout', [AdminController::class, 'signout'])->name('admin.signout');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/announcements', [AdminController::class, 'announcements'])->name('admin.announcements');
    Route::get('/announcements/create', [AdminController::class, 'create_announcement'])->name('admin.create_announcement')->middleware(['role:super_admin']);
    Route::get('/announcements/{id}/edit', [AdminController::class, 'edit_announcement'])->name('admin.edit_announcement')->middleware(['role:super_admin']);
    Route::get('/reminders', [AdminController::class, 'reminders'])->name('admin.reminders');
    Route::get('/reminders/create', [AdminController::class, 'create_reminder'])->name('admin.create_reminder')->middleware(['role:super_admin']);
    Route::get('/reminders/{id}/edit', [AdminController::class, 'edit_reminder'])->name('admin.edit_reminder')->middleware(['role:super_admin']);
    Route::get('/unit-heads', [AdminController::class, 'unit_heads_profile'])->name('admin.unit_heads.profiles')->middleware(['role:super_admin']);
    Route::get('/unit-heads/records', [AdminController::class, 'unit_heads_records'])->name('admin.unit_heads.records')->middleware(['role:super_admin']);
    Route::get('/unit-heads/create', [AdminController::class, 'create_unit_head'])->name('admin.unit_heads.create')->middleware(['role:super_admin']);
    Route::get('/admins', [AdminController::class, 'admins'])->name('admin.admins')->middleware(['role:super_admin']);
    Route::get('/admins/create', [AdminController::class, 'createAdmin'])->name('admin.admins.create')->middleware(['role:super_admin']);
    Route::get('/campus-admins/{id}/edit', [AdminController::class, 'editCampusAdmin'])->name('admin.campus_admin.edit')->middleware(['role:super_admin']);
    Route::prefix('/document-tracking')->group(function () {
        Route::get('/submission-bins', [AdminController::class, 'submission_bins'])->name('admin.submission_bins');
        Route::get('/submission-bins/create', [AdminController::class, 'create_submission_bin'])->name('admin.create_submission_bin');
    });
});

Route::prefix('/submission-bins')->middleware(['auth', 'role:super_admin'])->group(function () {
    Route::post('/create', [SubmissionBinController::class, 'create'])->name('submission_bins.create');
    Route::delete('/{id}', [SubmissionBinController::class, 'delete'])->name('submission_bins.delete');
    Route::patch('/{id}', [SubmissionBinController::class, 'edit'])->name('submission_bins.edit');
});

Route::prefix('/announcements')->middleware(['auth', 'role:super_admin'])->group(function () {
    Route::post('/create', [AnnouncementController::class, 'create'])->name('announcements.create');
    Route::delete('/{id}', [AnnouncementController::class, 'delete'])->name('announcements.delete');
    Route::patch('/{id}', [AnnouncementController::class, 'edit'])->name('announcements.edit');
});

Route::prefix('/reminders')->middleware(['auth', 'role:super_admin'])->group(function () {
    Route::post('/create', [ReminderController::class, 'create'])->name('reminders.create');
    Route::delete('/{id}', [ReminderController::class, 'delete'])->name('reminders.delete');
    Route::patch('/{id}', [ReminderController::class, 'edit'])->name('reminders.edit');
});
Route::prefix('/campus-admin')->middleware(['auth', 'role:super_admin'])->group(function () {
    Route::post('/create', [CampusAdminController::class, 'create'])->name('campus_admin.create');
    Route::delete('/{id}', [ReminderController::class, 'delete'])->name('campus_admin.delete');
    Route::patch('/{id}', [ReminderController::class, 'edit'])->name('campus_admin.edit');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::prefix('/users')->group(function () {
    Route::post('/login', [UsersController::class, 'login'])->name('users.login');
});

Route::prefix('/super-admin')->group(function () {
    Route::post('/register', [SuperAdminController::class, 'register'])->name('super_admin.register');
});

require __DIR__ . '/auth.php';
