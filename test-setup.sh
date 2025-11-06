#!/bin/bash

echo "=== Testing Backend and Frontend Setup ==="
echo ""

echo "1. Testing Backend Health (Port 3001):"
curl -s http://localhost:3001/health 2>/dev/null && echo " ✅ Backend healthy" || echo " ❌ Backend not responding"

echo ""
echo "2. Testing Backend Items API:"
curl -s http://localhost:3001/items 2>/dev/null | head -c 100 && echo "... ✅ API responding" || echo " ❌ API not responding"

echo ""
echo "3. Testing Frontend (Port 3002):"
curl -s -w "%{http_code}" http://localhost:3002/ 2>/dev/null | grep -q "200" && echo " ✅ Frontend responding" || echo " ❌ Frontend not responding"

echo ""
echo "=== Setup Status ==="
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:3002"
echo "API URL:  http://localhost:3001/items"