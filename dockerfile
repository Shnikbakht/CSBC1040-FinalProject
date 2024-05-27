# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies inside the Docker container
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env file to the working directory
COPY .env ./

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
