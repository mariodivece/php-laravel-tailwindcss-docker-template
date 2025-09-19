<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletter_subscriptions,email',
        ]);

        try {
            NewsletterSubscription::create([
                'email' => $request->email,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Successfully subscribed to newsletter!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to subscribe. Please try again.'
            ], 500);
        }
    }

    public function exportCsv(Request $request)
    {
        $token = $request->header('Authorization') ?? $request->get('token');
        
        if (!$token || $token !== 'Bearer ' . env('ADMIN_TOKEN') && $token !== env('ADMIN_TOKEN')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $subscriptions = NewsletterSubscription::all();
        
        $csvData = "Email,Subscribed At\n";
        foreach ($subscriptions as $subscription) {
            $csvData .= $subscription->email . ',' . $subscription->subscribed_at->format('Y-m-d H:i:s') . "\n";
        }

        return Response::make($csvData, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="newsletter_subscriptions.csv"',
        ]);
    }
}
