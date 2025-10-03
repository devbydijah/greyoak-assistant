# Dockerfile for Grey-Oak Assistant Mock Suite
FROM node:18

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Expose default ports (mock server + middleware)
EXPOSE 4000 5000

# Start both servers in parallel
CMD ["sh", "-c", "node greyoak-mock-server.js & node greyoak-middleware-router.js"]
