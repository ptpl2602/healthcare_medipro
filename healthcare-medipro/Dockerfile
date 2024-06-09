FROM node:18.20.2-alpine as BASE
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache git \
    && npm ci \
    && npm cache clean --force

FROM node:18.20.2-alpine as BUILD
WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
RUN npm i
COPY . .
RUN npm run build

FROM node:18.20.2-alpine AS PRODUCTION
WORKDIR /app
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

CMD ["npm", "run", "start"]
