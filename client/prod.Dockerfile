FROM node:20-alpine AS base

WORKDIR /app/client

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && pnpm add -g @angular/cli

FROM base AS deps

RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/client/node_modules ./node_modules
COPY . .
RUN ng build

FROM nginx:alpine AS runner
COPY --from=builder /app/client/dist/client/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
