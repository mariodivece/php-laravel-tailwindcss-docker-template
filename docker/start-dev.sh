#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting Development Environment..."

# Check if APP_KEY and ADMIN_TOKEN are set
if [ -z "$APP_KEY" ]; then
    echo "❌ ERROR: APP_KEY environment variable is not set!"
    exit 1
fi

if [ -z "$ADMIN_TOKEN" ]; then
    echo "❌ ERROR: ADMIN_TOKEN environment variable is not set!"
    exit 1
fi

echo "✅ Environment variables validated"

# Ensure directories exist and have proper permissions (fix runtime issues)
echo "📁 Ensuring proper directory permissions..."
mkdir -p /var/www/html/storage/logs \
    /var/www/html/storage/framework/cache \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/bootstrap/cache \
    /var/www/html/database

chown -R www-data:www-data /var/www/html/storage \
    /var/www/html/bootstrap/cache \
    /var/www/html/database

chmod -R 755 /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Create SQLite database if it doesn't exist
if [ ! -f /var/www/html/database/database.sqlite ]; then
    echo "📦 Creating SQLite database..."
    touch /var/www/html/database/database.sqlite
    chown www-data:www-data /var/www/html/database/database.sqlite
fi

# Run database migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# Clear cache for development
echo "🧹 Clearing cache for development..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

echo "🔥 Starting development services with hot reloading..."
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
