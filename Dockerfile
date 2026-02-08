# Build stage
FROM node:20-alpine as build
WORKDIR /app

# Copy package files first
COPY package.json ./

# Use npm install since package-lock.json is missing
# --legacy-peer-deps is required for React 19 compatibility with some plugins
RUN npm install --legacy-peer-deps --no-audit --prefer-offline

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