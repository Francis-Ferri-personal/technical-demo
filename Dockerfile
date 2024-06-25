FROM node:20-alpine AS builder

WORKDIR /app

COPY backend .

RUN npm install 