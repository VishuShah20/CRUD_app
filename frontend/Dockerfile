# Use Node.js image
FROM node:18

# set working directory
WORKDIR /app

#Copy frontend files
COPY . /app

#install dependencies
RUN npm install

# build frontend
RUN npm run build

# lightweight http server 
RUN npm install -g serve

# frontend port
EXPOSE 5173

# Serve the built React app
CMD ["serve", "-s", "dist", "-l", "5173"]
