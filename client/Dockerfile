FROM node:20-alpine as base
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && pnpm add -g @angular/cli
USER app

FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN ng build --configuration=production

FROM nginx:alpine AS final
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/client/ /usr/share/nginx/html
