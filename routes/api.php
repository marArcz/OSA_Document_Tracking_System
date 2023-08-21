<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\Api\ClassificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReminderController;
use App\Http\Controllers\ReportCommentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\UsersController;
use App\Models\Reminder;
use App\Models\ReportComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/users')->group(function () {
    // Route::post('/check', [ProfileController::class, 'checkEmailAndPhone']);
    Route::post('/check', [UsersController::class, 'check']);
});

Route::prefix('/classifications')->group(function () {
    Route::get('/all', [ClassificationController::class, 'getAll'])->name('api.classifications.all');
});

Route::post('/image-upload', function (Request $request) {
    $image = $request->file('image');
    $imageName = $image->getClientOriginalName();
    $image->move(public_path('images'), $imageName);
    $imageUrl = "/images/" .  $imageName;

    return response()->json(['imageUrl' => $imageUrl]);
});

Route::post('/image-upload', function (Request $request) {
    $image = $request->file('image');
    $imageName = $image->getClientOriginalName();
    $image->move(public_path('images'), $imageName);
    $imageUrl = "/images/" .  $imageName;

    return response()->json(['imageUrl' => $imageUrl]);
});
Route::post('/file-upload', function (Request $request) {
    $file = $request->file('file');
    $fileName = $file->getClientOriginalName();
    $file->move(public_path('reports'), $fileName);
    $fileUrl = "/reports/" .  $fileName;

    return response()->json(['fileUrl' => $fileUrl]);
});

Route::post('/upload-report',[ReportController::class,'addReport']);
Route::delete('/report/{id}/attachment',[ReportController::class,'removeAttachment']);

Route::delete('/reminders/{id}', [ReminderController::class, 'delete']);
Route::delete('/announcements/{id}', [AnnouncementController::class, 'delete']);
Route::patch('/announcements/order', [AnnouncementController::class, 'order']);
Route::get('/announcements', [AnnouncementController::class, 'getAll']);
Route::post('/unit-heads/designations', [AdminController::class, 'unit_heads_by_designation']);
Route::get('/admins', [AdminController::class, 'getAdmins']);
Route::get('/admins/{campus_id}', [AdminController::class, 'getAdminsByCampus']);


Route::prefix('/reports')->group(function(){
    Route::get('/{campus_id}/{submission_bin_id}/all',[ReportController::class,'all']);
    Route::get('/{campus_id}/{submission_bin_id}/approved',[ReportController::class,'getApproved']);
    Route::get('/{campus_id}/unit_heads',[ReportController::class,'unit_heads']);
});

Route::prefix('/comments')->group(function(){
    Route::post('/add',[ReportCommentController::class,'add']);
    Route::get('/{unit_head_id}/{submission_bin_id}/get',[ReportCommentController::class,'get']);
});