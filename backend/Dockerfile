FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run dev || true

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./
COPY --from=builder /app/db ./db
COPY --from=builder /app/.env ./.env
EXPOSE 3000
CMD ["sh", "-c", "node db/migrate.js && node server.js"]
