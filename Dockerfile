# Dockerfile for Grey-Oak Assistant Mock Suite
FROM node:18

WORKDIR /app
COPY . .

RUN npm install
EXPOSE 4000 5000

CMD ["sh", "-c", "node greyoak-mock-server.js & node greyoak-middleware-router.js"]
