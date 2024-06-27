# Use the official Nginx image as base
FROM nginx:latest

# Copy custom configuration file to Nginx config location
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# CMD to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
