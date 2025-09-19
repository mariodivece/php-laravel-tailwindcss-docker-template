<?php

use App\Http\Controllers\NewsletterController;
use Illuminate\Support\Facades\Route;

Route::get('/newsletter/export', [NewsletterController::class, 'exportCsv'])->name('api.newsletter.export');
