FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile && \
    pnpm run build 

FROM base AS runner
WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 react

COPY --from=builder  /app /app
# COPY --from=builder --chown=react:nodejs /app/node_modules /app/node_modules
# COPY --from=builder --chown=react:nodejs /app/dist /app/dist
# COPY --from=builder --chown=react:nodejs /app/package.json /app/package.json

# USER react
EXPOSE 3000

CMD ["pnpm", "run", "dev"]
