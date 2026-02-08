# Build stage
FROM node:20-alpine as build
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Use npm ci for faster, more reliable installs in Docker
# --legacy-peer-deps handles React 19 compatibility
RUN npm ci --legacy-peer-deps --prefer-offline --no-audit

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# SPA routing support for Nginx
RUN printf 'server {\n  listen 80;\n  location / {\n    root /usr/share/nginx/html;\n    index index.html index.htm;\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]