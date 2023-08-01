<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReminderController;
use App\Http\Controllers\SuperAdminController;
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
    return Inertia::render('Welcome');
});

Route::prefix('/super-admin')->group(function () {
    Route::get('/', [SuperAdminController::class, 'index'])->name('super-admin.index');
    Route::get('/register', [SuperAdminController::class, 'register'])->name('super-admin.register');
});

Route::prefix('/super-admin')->group(function () {
    Route::get('/dashboard', [SuperAdminController::class, 'dashboard'])->name('super-admin.dashboard')->middleware(['auth:super_admin', 'verified']);
    Route::get('/announcements', [SuperAdminController::class, 'announcements'])->name('super-admin.announcements')->middleware(['auth:super_admin', 'verified']);
    Route::get('/announcements/create', [SuperAdminController::class, 'create_announcement'])->name('super-admin.create_announcement')->middleware(['auth:super_admin', 'verified']);
    Route::get('/announcements/{id}/edit', [SuperAdminController::class, 'edit_announcement'])->name('super-admin.edit_announcement')->middleware(['auth:super_admin', 'verified']);
    Route::get('/reminders', [SuperAdminController::class, 'reminders'])->name('super-admin.reminders')->middleware(['auth:super_admin', 'verified']);
    Route::get('/reminders/create', [SuperAdminController::class, 'create_reminder'])->name('super-admin.create_reminder')->middleware(['auth:super_admin', 'verified']);
    Route::get('/reminders/{id}/edit', [SuperAdminController::class, 'edit_reminder'])->name('super-admin.edit_reminder')->middleware(['auth:super_admin', 'verified']);
});

Route::prefix('/announcements')->group(function(){
    Route::post('/create',[AnnouncementController::class,'create'])->name('announcements.create');
    Route::delete('/{id}', [AnnouncementController::class, 'delete'])->name('announcements.delete')->middleware(['auth:super_admin', 'verified']);
    Route::patch('/{id}', [AnnouncementController::class, 'edit'])->name('announcements.edit')->middleware(['auth:super_admin', 'verified']);
});

Route::prefix('/reminders')->group(function(){
    Route::post('/create',[ReminderController::class,'create'])->name('reminders.create');
    Route::delete('/{id}', [ReminderController::class, 'delete'])->name('reminders.delete');
    Route::patch('/{id}', [ReminderController::class, 'edit'])->name('reminders.edit');
})->middleware(['auth:super_admin', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth:super_admin', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
