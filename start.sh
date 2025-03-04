#!/bin/bash

# Start the Node.js server
echo "Starting Node.js server..."
cd node-server && npm run dev &

pwd 

# Start the Vite server
echo "Starting Vite server..."
cd web-client && npm run dev &

# Wait for both processes to complete
wait