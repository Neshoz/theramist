# Build stage
FROM node:18-alpine as build

WORKDIR /base

# Copy workspace config
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY ./packages/common packages/common
COPY ./packages/api packages/api
RUN yarn install --network-timeout 1000000
COPY ./packages/common packages/common
COPY ./packages/api packages/api
RUN yarn workspace @thermonitor/api build;

# Run
FROM node:18-alpine
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/app
COPY --chown=node:node --from=build /base .
WORKDIR /usr/app/packages/api
USER node
EXPOSE 8001

CMD if [ "${NODE_ENV}" = "production" ] ; \
      then node build/index.js ; \
      else yarn nodemon ; \
    fi