# --- Stage 1: Build the application ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependency manifests and install them
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and build it
COPY . .
RUN npm run build

# --- Stage 2: Serve the application ---
FROM nginx:alpine

# Copy the compiled production build from Stage 1 to Nginx
# (Change "dist" to "build" if you are using older Create-React-App instead of Vite)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]