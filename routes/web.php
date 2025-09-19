<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
