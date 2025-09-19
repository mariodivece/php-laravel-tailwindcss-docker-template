#!/bin/bash

# Exit on any error
set -e

echo "Starting Single Page Web App..."

# Check if APP_KEY and ADMIN_TOKEN are set
if [ -z "$APP_KEY" ]; then
    echo "ERROR: APP_KEY environment variable is not set!"
    exit 1
fi

if [ -z "$ADMIN_TOKEN" ]; then
    echo "ERROR: ADMIN_TOKEN environment variable is not set!"
    exit 1
fi

echo "✓ Environment variables validated"

# Create SQLite database if it doesn't exist
if [ ! -f /var/www/html/database/database.sqlite ]; then
    echo "Creating SQLite database..."
    touch /var/www/html/database/database.sqlite
    chown www-data:www-data /var/www/html/database/database.sqlite
fi

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Clear and cache configuration for production
echo "Optimizing application for production..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM in the background
echo "Starting PHP-FPM..."
php-fpm -D

# Start nginx in the foreground
echo "Starting nginx..."
nginx -g "daemon off;"
