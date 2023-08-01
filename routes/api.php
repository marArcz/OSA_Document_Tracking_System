<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\ClassificationController;
use App\Http\Controllers\ReminderController;
use App\Http\Controllers\SuperAdminController;
use App\Models\Reminder;
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

Route::prefix('/super-admin')->group(function () {
    Route::post('/check', [SuperAdminController::class, 'checkEmailAndPhone']);
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

Route::delete('/reminders/{id}', [ReminderController::class, 'delete'])->name('api.announcements.delete');
