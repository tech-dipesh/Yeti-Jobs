FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm@latest
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm run build
FROM node:22-alpine
RUN npm install -g pnpm@latest
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
