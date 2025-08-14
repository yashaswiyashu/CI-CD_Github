# ---- build stage ----
FROM node:22.14.0-alpine3.21 AS build
WORKDIR /app

# Install deps (use lockfile if you have it)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build


# ---- run stage ----
FROM node:22.14.0-alpine3.21
WORKDIR /app
ENV NODE_ENV=production

# Only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build artifacts
COPY --from=build /app/dist ./dist

# If you need runtime assets/env files, copy them too, e.g.:
# COPY --from=build /app/prisma ./prisma

EXPOSE 4000
# Match your package.json "start" script / entry file
CMD ["node", "dist/server.js"]