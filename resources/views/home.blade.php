@extends('layouts.app')

@section('title', 'Welcome to Our Single Page Web App')

@section('content')
    <main class="min-h-screen">
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h1 class="text-5xl font-bold mb-6">Welcome to Our Platform</h1>
                <p class="text-xl mb-8 opacity-90">
                    Discover amazing features and stay connected with our community. 
                    Join thousands of users who trust our platform for their needs.
                </p>
                <div class="flex justify-center space-x-4">
                    <a href="#newsletter" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Subscribe to Newsletter
                    </a>
                    <a href="#contact" class="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                        Get in Touch
                    </a>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 bg-white">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        We provide exceptional service with cutting-edge technology and outstanding support.
                    </p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="text-center p-6">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Fast & Reliable</h3>
                        <p class="text-gray-600">Lightning-fast performance with 99.9% uptime guarantee.</p>
                    </div>
                    
                    <div class="text-center p-6">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Secure & Trusted</h3>
                        <p class="text-gray-600">Enterprise-grade security to protect your data.</p>
                    </div>
                    
                    <div class="text-center p-6">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">24/7 Support</h3>
                        <p class="text-gray-600">Round-the-clock customer support when you need it.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section id="newsletter" class="py-16 bg-gray-100">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
                <p class="text-gray-600 mb-8">
                    Subscribe to our newsletter and be the first to know about new features, updates, and exclusive offers.
                </p>
                <div id="newsletter-form-container"></div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-16 bg-white">
            <div class="max-w-4xl mx-auto px-6">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p class="text-gray-600">
                        Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
                <div id="contact-form-container"></div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-12">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Single Page Web App</h3>
                    <p class="text-gray-400 mb-6">Building amazing experiences for our users.</p>
                    <div class="border-t border-gray-700 pt-6">
                        <p class="text-gray-400 text-sm">
                            © {{ date('Y') }} Single Page Web App. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </main>
@endsection
