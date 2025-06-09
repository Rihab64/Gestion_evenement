<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ProviderController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\RequestController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\SearchController;

// Route::get('/', function () {
//     return view('home');
// });
// Route::get('/', function () {
//     return view('home');
// });
Route::get('/{any}', function () {
    return view('app'); // Vue Blade contenant ton React
})->where('any', '.*');

// Exemple classique (routes/web.php)

