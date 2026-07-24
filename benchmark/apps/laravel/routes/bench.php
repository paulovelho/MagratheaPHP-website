<?php

use App\Http\Controllers\BenchController;
use Illuminate\Support\Facades\Route;

Route::get('/hello', [BenchController::class, 'hello']);
Route::get('/planets', [BenchController::class, 'planets']);
