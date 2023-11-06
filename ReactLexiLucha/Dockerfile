# Use an official Node.js runtime as the base image
FROM node:16 as builder

# Set the image name
LABEL org.opencontainers.image.title="$DOCKER_IMAGE_NAME"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite project
RUN npm run build

# Create a new stage for serving the app
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install the `serve` package globally
RUN npm install -g serve

# Copy the build output from the builder stage to the current stage
COPY --from=builder /app/dist ./dist

# Expose a port for the serve command to listen on
EXPOSE 3000

# Define the command to run when the container starts
CMD ["serve", "dist"]
