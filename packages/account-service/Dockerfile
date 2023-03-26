# Build stage
FROM node:18-alpine as build
RUN apk add g++ make py3-pip # Needed by bcrypt

WORKDIR /base

# Copy workspace config
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY ./packages/common packages/common
COPY ./packages/account-service packages/account-service
RUN yarn install --network-timeout 1000000
COPY ./packages/common packages/common
COPY ./packages/account-service packages/account-service
RUN yarn workspace @thermonitor/account-service build;

# Run
FROM node:18-alpine
RUN apk add --no-cache bash
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/app
COPY --chown=node:node --from=build /base .
WORKDIR /usr/app/packages/account-service
USER node
EXPOSE 8001

CMD if [ "${NODE_ENV}" = "production" ] ; \
      then node build/index.js ; \
      else yarn nodemon ; \
    fi