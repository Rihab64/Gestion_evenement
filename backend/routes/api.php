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



Route::get('/auth', [AuthController::class, 'index']);

// Auth public


Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/auth/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/auth/register', [AuthController::class, 'register']);


// Authenticated user info/logout
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/me', [AuthController::class, 'me']);
});

// Groupe CLIENT
Route::middleware(['auth:sanctum', 'client'])->prefix('client')->group(function () {
    Route::apiResource('events', EventController::class);
    // Route::get('favorites', [FavoriteController::class, 'index']); // à créer
    // Route::get('messages', [MessageController::class, 'index']);   // à créer
    // Route::get('profile', [ClientProfileController::class, 'show']); // à créer
    Route::post('requests', [RequestController::class, 'store']);
});

// Groupe PROVIDER
Route::middleware(['auth:sanctum', 'provider'])->prefix('provider')->group(function () {
    Route::apiResource('services', ServiceController::class);
    Route::get('requests', [RequestController::class, 'index']);
    Route::get('requests/{request}', [RequestController::class, 'show']);
    Route::put('requests/{request}', [RequestController::class, 'update']);
    Route::post('requests/{request}/accept', [RequestController::class, 'accept']);
    Route::post('requests/{request}/reject', [RequestController::class, 'reject']);
    // Route::get('availabilities', [AvailabilityController::class, 'index']); // à créer
    // Route::get('stats', [StatisticController::class, 'index']); // à créer
});

// Groupe ADMIN
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Route::apiResource('users', UserController::class); // à créer
    // Route::get('moderation', [ModerationController::class, 'index']); // à créer
});

// Routes publiques (pas d'auth)
Route::get('/providers', [ProviderController::class, 'index']);
Route::get('/providers/search', [ProviderController::class, 'search']);
Route::get('/providers/category/{categoryId}', [ProviderController::class, 'byCategory']);
Route::get('/providers/{id}', [ProviderController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/services/search', [ServiceController::class, 'search']);

Route::get('/search/services', [SearchController::class, 'services']);
Route::get('/search/providers', [SearchController::class, 'providers']);