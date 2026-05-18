# Multi-stage production Dockerfile for the React (CRA) frontend
# Alternative to Nixpacks for Coolify.
#
# Build-time env var REACT_APP_BACKEND_URL must be provided
# (e.g. via Coolify "Build-time Variables" or --build-arg).

# ---------- Stage 1: build ----------
FROM node:20-alpine AS builder

WORKDIR /app

ENV CI=false \
    GENERATE_SOURCEMAP=false

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

COPY . .
RUN yarn build

# ---------- Stage 2: serve ----------
FROM nginx:1.27-alpine AS runner

# Copy custom nginx config (SPA fallback + API passthrough hint)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
