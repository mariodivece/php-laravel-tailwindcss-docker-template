<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        try {
            $contactEmail = env('CONTACT_EMAIL', 'admin@example.com');
            
            Mail::raw($this->formatMessage($request->all()), function (Message $message) use ($request, $contactEmail) {
                $message->to($contactEmail)
                       ->subject('Contact Form Submission from ' . $request->name)
                       ->replyTo($request->email, $request->name);
            });

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send message. Please try again.'
            ], 500);
        }
    }

    private function formatMessage(array $data): string
    {
        return "New contact form submission:\n\n" .
               "Name: {$data['name']}\n" .
               "Email: {$data['email']}\n\n" .
               "Message:\n{$data['message']}\n\n" .
               "Submitted at: " . now()->format('Y-m-d H:i:s');
    }
}
