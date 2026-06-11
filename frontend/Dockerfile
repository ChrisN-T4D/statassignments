FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src

ARG VITE_POCKETBASE_URL
ARG VITE_FASTAPI_URL
ARG VITE_METRICS_API_URL
ENV VITE_POCKETBASE_URL=$VITE_POCKETBASE_URL
ENV VITE_FASTAPI_URL=$VITE_FASTAPI_URL
ENV VITE_METRICS_API_URL=$VITE_METRICS_API_URL

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve@14

COPY --from=build /app/dist ./dist

ENV PORT=3000

CMD ["sh", "-c", "serve -s dist -l ${PORT:-3000}"]
