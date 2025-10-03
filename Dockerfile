# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package manifests and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app files
COPY server.js intent-mapper.js greyoak-mock-server.js greyoak-middleware-router.js ./

# Expose the app port
EXPOSE 10000

# Start the app
CMD ["node", "server.js"]
