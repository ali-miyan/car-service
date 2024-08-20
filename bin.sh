#!/bin/bash

echo "Starting client service..."
cd frontend
npm run dev &
cd ..

echo "Starting user service..."
cd backend/user-service
npm start &
cd ../..

echo "Starting company service..."
cd backend/company-servive
npm start &
cd ../..

echo "Starting admin service..."
cd backend/admin-service
npm start &
cd ../..

echo "Starting booking service..."
cd backend/booking-service
npm start &
cd ../..

echo "Starting chat service..."
cd backend/chat-service
npm start &
cd ../..

wait
