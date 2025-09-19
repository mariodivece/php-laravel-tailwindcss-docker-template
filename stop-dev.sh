#!/bin/bash

echo "🛑 Stopping development environment..."
docker-compose -f docker-compose.dev.yml down

echo "✅ Development environment stopped successfully!"
echo "📝 To start again, run: ./start-dev.sh"
