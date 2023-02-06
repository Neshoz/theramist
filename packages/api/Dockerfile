# Build
FROM node:18-alpine
COPY package.json .
COPY yarn.lock .
RUN yarn install --network-timeout 1000000
RUN yarn build
USER node
EXPOSE 8001
CMD if [ "${NODE_ENV}" = "production" ] ; \
      then node build/index.js ; \
      else yarn nodemon ; \
    fi

# Run
# FROM node:18-alpine
# ARG NODE_ENV=development
# ENV NODE_ENV=$NODE_ENV
# WORKDIR /usr/src/app
# COPY --from=build /base .
# WORKDIR /usr/src/app/packages/engine
# USER node
# EXPOSE 8001
# CMD if [ "${NODE_ENV}" = "production" ] ; \
      # then node build/index.js ; \
      # else yarn nodemon ; \
    # fi