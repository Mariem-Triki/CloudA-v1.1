# Build stage
FROM node:20-alpine as build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy-peer-deps to handle React 19 conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom nginx config if needed, otherwise default works for SPA
RUN printf 'server {\n  listen 80;\n  location / {\n    root /usr/share/nginx/html;\n    index index.html index.htm;\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]