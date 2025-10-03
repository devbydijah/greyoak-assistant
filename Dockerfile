# Use Node 18 LTS
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy only the necessary runtime files
COPY server.js intent-mapper.js ./

# (Optional: copy these if used locally but safe for deploy)
COPY greyoak-mock-server.js greyoak-middleware-router.js ./

# Expose the port for Render
EXPOSE 5000

# Run the intent router
CMD ["node", "server.js"]
