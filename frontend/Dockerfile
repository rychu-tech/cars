# Use an official node runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Serve the app with a simple HTTP server
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "build"]
