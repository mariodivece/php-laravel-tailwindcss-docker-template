#!/bin/bash

# Single Page Web App Development Script
# This script sets up a complete development environment with hot reloading

set -e

echo "🚀 Starting Development Environment..."

# Load environment variables from .env file
if [ -f .env ]; then
    echo "📋 Loading environment variables from .env file..."
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ ERROR: .env file not found!"
    echo "Please create a .env file with APP_KEY and ADMIN_TOKEN defined."
    exit 1
fi

# Validate required environment variables
echo "🔍 Validating environment variables..."

if [ -z "$APP_KEY" ]; then
    echo "❌ ERROR: APP_KEY environment variable is not set in .env file!"
    echo "Please set APP_KEY in your .env file"
    exit 1
fi

if [ -z "$ADMIN_TOKEN" ]; then
    echo "❌ ERROR: ADMIN_TOKEN environment variable is not set in .env file!"
    echo "Please set ADMIN_TOKEN in your .env file"
    exit 1
fi

echo "✅ Environment variables validated successfully"

# Stop existing development container if running
echo "🛑 Stopping existing development container (if running)..."
docker-compose -f docker-compose.dev.yml down 2>/dev/null || true

# Remove existing development volumes for fresh start
echo "🗑️  Cleaning up development environment..."
docker volume rm webapp_dev_database 2>/dev/null || true
docker volume rm webapp_dev_storage 2>/dev/null || true

# Build and start the development environment
echo "🔨 Building development environment..."
docker-compose -f docker-compose.dev.yml build --no-cache

echo "🎉 Starting development environment..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for services to start
echo "⏳ Waiting for development services to start..."
sleep 15

# Check if the container is running
if docker ps -q -f name=single-page-webapp-dev | grep -q .; then
    echo "✅ Development environment started successfully!"
    echo ""
    echo "🌐 Application: http://localhost:8915"
    echo "⚡ Vite Dev Server: http://localhost:5173"
    echo "📊 API Endpoint: http://localhost:8915/api/newsletter/export?token=YOUR_ADMIN_TOKEN"
    echo ""
    echo "🔥 HOT RELOADING ENABLED:"
    echo "   • PHP/Laravel files: Auto-reload on change"
    echo "   • React/TypeScript: Hot Module Replacement (HMR)"
    echo "   • Tailwind CSS: Live CSS updates"
    echo ""
    echo "📋 Development Commands:"
    echo "   • View logs: docker logs single-page-webapp-dev -f"
    echo "   • Stop dev env: docker-compose -f docker-compose.dev.yml down"
    echo "   • Restart: ./start-dev.sh"
    echo ""
    echo "📝 VS Code Integration:"
    echo "   • All file changes will be reflected automatically"
    echo "   • CSS/JS changes appear instantly via HMR"
    echo "   • PHP changes reload the page automatically"
    echo ""
    echo "🎯 Development Tips:"
    echo "   • Edit files in VS Code - changes are instantly synced"
    echo "   • Browser will auto-refresh for PHP changes"
    echo "   • React components update without page refresh"  
    echo "   • Tailwind classes apply immediately"
    echo ""
    echo "Container status:"
    docker ps -f name=single-page-webapp-dev
else
    echo "❌ ERROR: Development container failed to start!"
    echo "📜 Checking logs..."
    docker logs single-page-webapp-dev || true
    exit 1
fi

echo "🎉 Development environment is ready! Happy coding! 🚀"
