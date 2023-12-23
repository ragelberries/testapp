FROM docker.io/node:21.4-alpine3.18 as build

WORKDIR /code
COPY package.json package.json
COPY package-lock.json package-lock.json 

RUN npm ci

COPY . .

RUN npm run build
FROM docker.io/nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/dist /usr/share/nginx/html