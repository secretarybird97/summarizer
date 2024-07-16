FROM node:20-alpine as base
# ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && pnpm add -g @angular/cli

FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN ng build --configuration=production
EXPOSE 4000
CMD ["node", "dist/client/server/server.mjs"]
