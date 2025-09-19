#!/bin/bash

# Single Page Web App Deployment Script
# This script stops the running container, removes volumes, and recreates everything from scratch

set -e

echo "🚀 Starting Single Page Web App Deployment..."

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
    echo "Please set APP_KEY in your .env file (e.g., APP_KEY=base64:YourKeyHere)"
    exit 1
fi

if [ -z "$ADMIN_TOKEN" ]; then
    echo "❌ ERROR: ADMIN_TOKEN environment variable is not set in .env file!"
    echo "Please set ADMIN_TOKEN in your .env file (e.g., ADMIN_TOKEN=your-secure-token)"
    exit 1
fi

echo "✅ Environment variables validated successfully"
echo "   - APP_KEY: ${APP_KEY:0:20}..." 
echo "   - ADMIN_TOKEN: ${ADMIN_TOKEN:0:10}..."

# Stop and remove existing container if it exists
echo "🛑 Stopping existing container (if running)..."
if docker ps -q -f name=single-page-webapp | grep -q .; then
    docker stop single-page-webapp || true
fi

if docker ps -a -q -f name=single-page-webapp | grep -q .; then
    echo "🗑️  Removing existing container..."
    docker rm single-page-webapp || true
fi

# Remove existing volumes for fresh start
echo "🗑️  Removing existing volumes..."
docker volume rm webapp_data 2>/dev/null || echo "   Volume webapp_data not found (this is normal for first run)"
docker volume rm webapp_database 2>/dev/null || echo "   Volume webapp_database not found (this is normal for first run)"

# Build and start the application
echo "🔨 Building application image..."
docker-compose build --no-cache

echo "🚀 Starting application in production mode..."
docker-compose up -d

# Wait a moment for the container to start
echo "⏳ Waiting for application to start..."
sleep 10

# Check if the container is running
if docker ps -q -f name=single-page-webapp | grep -q .; then
    echo "✅ Application started successfully!"
    echo ""
    echo "🌐 Application is now available at: http://localhost"
    echo "📊 Newsletter export API: http://localhost/api/newsletter/export?token=YOUR_ADMIN_TOKEN"
    echo ""
    echo "📋 Container status:"
    docker ps -f name=single-page-webapp
    echo ""
    echo "📜 To view logs, run: docker logs single-page-webapp"
    echo "⏹️  To stop the application, run: docker-compose down"
else
    echo "❌ ERROR: Container failed to start!"
    echo "📜 Checking logs..."
    docker logs single-page-webapp || true
    exit 1
fi

echo "🎉 Deployment completed successfully!"
