FROM node:20-alpine AS base

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && pnpm add -g @angular/cli

FROM base AS deps

RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN ng build --optimization

FROM base AS runner

RUN addgroup --system --gid 1002 nodejs
RUN adduser --system --uid 1002 angular
USER angular

COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

ENV HOSTNAME "0.0.0.0"

CMD ["pnpm", "run", "serve:ssr:frontend"]
