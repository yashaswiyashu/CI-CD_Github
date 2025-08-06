FROM node:22.14.0-alpine3.21

# Setworking directory
WORKDIR /app

COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the application code to the container
COPY . .


# Compile TypeScript files to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Command to run the app
CMD ["node", "dist/index.js"]
