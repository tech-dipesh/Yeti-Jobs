FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@latest
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pn run dev || true

FROM node:22-alpine
WORKDIR /app
RUN npm install -g pnpm@latest
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./
COPY --from=builder /app/db ./db
COPY --from=builder /app/swagger.yaml ./
EXPOSE 3000
CMD ["sh", "-c", "node db/migrate.js && node server.js"]
