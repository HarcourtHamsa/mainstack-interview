# Use an official Node runtime as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm install --include=dev  # Explicitly include dev dependencies

# Copy source code *before* building
COPY . .

# Build the TypeScript project
RUN npm run build  # Now tsc can access your .ts files

# Rebuild bcrypt for ARM64 if needed
RUN npm rebuild bcrypt

# Expose the port the app runs on
EXPOSE 80

# Start the application
CMD ["npm", "run", "start"]