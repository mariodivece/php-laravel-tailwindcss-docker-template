<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'subscribed_at',
    ];

    protected $casts = [
        'subscribed_at' => 'datetime',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($subscription) {
            $subscription->subscribed_at = now();
        });
    }
}
