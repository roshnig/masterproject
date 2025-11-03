# OPTION 1-  Use if created app using vite
# Stage 1: Base (common setup)
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development (hot reload)
FROM base AS dev
COPY . .
EXPOSE 5173
ENV CHOKIDAR_USEPOLLING=true
CMD ["npm", "run", "dev"]

# Stage 3: Production build
FROM base AS build
COPY . .
RUN npm run build

# Stage 4: Production server (Nginx)
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# OPTION 2- Use if created app using create react app
# FROM node:lts-alpine
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# CMD ['npm', 'start']