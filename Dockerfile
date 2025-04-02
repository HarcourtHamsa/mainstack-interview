# Use an official Node runtime as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Build the project
RUN npm run build

# Rebuild bcrypt for ARM64
RUN npm rebuild bcrypt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 80

# Start the application in watch mode
CMD ["npm", "run", "start"]
