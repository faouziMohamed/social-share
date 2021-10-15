# Install dependencies only when needed
FROM node:14-alpine as deps
WORKDIR /home/app
ENV NODE_ENV production
COPY package.json yarn.lock  ./
RUN yarn install --immutable 

# Rebuild the source code only when needed
FROM node:14-alpine as builder
# USER node
WORKDIR /home/app
# ENV NODE_ENV production
COPY . .
COPY --from=deps  /home/app/node_modules ./node_modules
RUN yarn build && yarn install --production --immutable --ignore-scripts --prefer-offline


FROM node:14-alpine as runner
USER node
WORKDIR /home/app

# Production image, copy all the files and run next
COPY --from=builder /home/app/node_modules ./node_modules
COPY --from=builder  --chown=node:node /home/app/package.json /home/app/yarn.lock ./
COPY --from=builder  --chown=node:node /home/app/node_modules ./node_modules
COPY --from=builder  --chown=node:node /home/app/public ./public
COPY --from=builder  --chown=node:node /home/app/.next ./.next
COPY --from=builder  --chown=node:node /home/app/next.config.js ./next.config.js
COPY --chown=node:node .env .env.production ./

# EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

CMD ["yarn", "start"]

