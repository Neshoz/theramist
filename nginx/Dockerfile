FROM node:18-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY ./packages/webapp/package.json ./packages/webapp/

RUN yarn install

COPY ./packages/webapp ./packages/webapp

RUN yarn workspace @thermonitor/webapp build

FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/packages/webapp/dist /usr/share/nginx/html/webapp
EXPOSE 80
EXPOSE 3000
CMD ["nginx", "-g","daemon off;"]