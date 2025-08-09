#!/bin/bash
# start.sh - Wait for Redis and start the Next.js application

set -e

# Default values
REDIS_HOST=${REDIS_HOST:-redis}
REDIS_PORT=${REDIS_PORT:-6379}
MAX_ATTEMPTS=${MAX_ATTEMPTS:-30}
WAIT_INTERVAL=${WAIT_INTERVAL:-2}

echo "🔄 Waiting for Redis at $REDIS_HOST:$REDIS_PORT..."

# Function to check Redis connectivity using Node.js
check_redis() {
    node -e "
        const net = require('net');
        const client = new net.Socket();
        client.setTimeout(3000);
        client.connect($REDIS_PORT, '$REDIS_HOST', () => {
            client.destroy();
            process.exit(0);
        });
        client.on('error', () => {
            client.destroy();
            process.exit(1);
        });
        client.on('timeout', () => {
            client.destroy();
            process.exit(1);
        });
    " >/dev/null 2>&1
}

# Wait for Redis to be ready
attempt=1
while [ $attempt -le $MAX_ATTEMPTS ]; do
    if check_redis; then
        echo "✅ Redis is ready!"
        break
    fi
    
    echo "⏳ Attempt $attempt/$MAX_ATTEMPTS: Redis not ready, waiting ${WAIT_INTERVAL}s..."
    sleep $WAIT_INTERVAL
    attempt=$((attempt + 1))
done

# Check if we successfully connected
if [ $attempt -gt $MAX_ATTEMPTS ]; then
    echo "❌ Error: Redis is not available after $MAX_ATTEMPTS attempts"
    echo "   Check if Redis service is running and accessible at $REDIS_HOST:$REDIS_PORT"
    exit 1
fi

echo "🚀 Starting Next.js application..."

# Start the Next.js application
exec npm start
