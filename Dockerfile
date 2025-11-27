# Use a base image
FROM nginx:alpine

# Copy your app files into container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
