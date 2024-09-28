#!/bin/bash

echo "Starting client service..."
cd frontend
npm run dev &
cd ..

echo "Starting user service..."
cd backend/userService
npm start &
cd ../..

echo "Starting company service..."
cd backend/companyServive
npm start &
cd ../..

echo "Starting admin service..."
cd backend/adminService
npm start &
cd ../..

echo "Starting booking service..."
cd backend/bookingService
npm start &
cd ../..

echo "Starting chat service..."
cd backend/chatService
npm start &
cd ../..

wait
