# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy frontend files
COPY . /app

# Install dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Install a lightweight HTTP server
RUN npm install -g serve

# Expose frontend port
EXPOSE 5173

# Serve the built React app
CMD ["serve", "-s", "dist", "-l", "5173"]
