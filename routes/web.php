<?php

use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/blog', [BlogController::class, 'index']);
    Route::post('/blog/store', [BlogController::class, 'store']);
});

require __DIR__.'/settings.php';
