# ─── Stage 1: Build ───────────────────────────────────────────────
# Node 22.22.0 (matches local dev environment)
FROM node:22.22.0-alpine AS builder

WORKDIR /app

# Install dependencies using exact lockfile
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build with Vite 8
COPY . .
RUN npm run build

# ─── Stage 2: Serve ───────────────────────────────────────────────
# Serve the static Vite dist/ output via Nginx
FROM nginx:1.27-alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config for SPA routing (React Router)
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
