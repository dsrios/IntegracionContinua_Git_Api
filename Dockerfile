### STEP 1: Build ###
FROM node:12.7-alpine AS build-app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STEP 2: Run web server ###
FROM nginx
RUN apt update && apt install -y curl
COPY --from=build-app /usr/src/app/dist/ic-gestor-de-candidatos /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html