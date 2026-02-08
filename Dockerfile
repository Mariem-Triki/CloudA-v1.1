# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install pnpm globally for faster package management
RUN npm install -g pnpm

# Copy package files first to leverage layer caching
COPY package.json ./

# Use pnpm with a cache mount for the store
# --no-frozen-lockfile allows it to work without an existing lockfile
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --no-frozen-lockfile --silent

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# SPA routing support for Nginx
RUN printf 'server {\n  listen 80;\n  location / {\n    root /usr/share/nginx/html;\n    index index.html index.htm;\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]