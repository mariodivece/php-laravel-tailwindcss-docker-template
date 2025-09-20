#!/bin/bash

# Build script for the base Docker image containing OS dependencies
# This script builds the base image that both production and development images inherit from

set -e

echo "🏗️  Building base Docker image with OS dependencies..."

# Build the base image
docker build -f Dockerfile.base -t laravel-react-base .

echo "✅ Base image 'laravel-react-base' built successfully!"
echo ""
echo "📋 Next steps:"
echo "   - For production: ./deploy.sh"
echo "   - For development: ./start-dev.sh"
echo ""
echo "💡 The base image contains:"
echo "   - PHP 8.2-FPM with extensions (pdo_sqlite, mbstring, etc.)"
echo "   - Node.js and npm"
echo "   - Nginx"
echo "   - Composer"
echo "   - System dependencies (git, curl, etc.)"
echo "   - Supervisor (for development)"
echo ""
echo "🔄 To rebuild the base image when dependencies change, run this script again."
