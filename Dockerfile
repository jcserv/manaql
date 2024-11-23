FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates

FROM base AS prod

COPY pnpm-lock.yaml package.json /app/
WORKDIR /app
RUN pnpm fetch --prod

COPY . /app
RUN npx prisma generate
RUN pnpm run build

FROM base
WORKDIR /app
COPY --from=prod /app/package.json /app/package.json
COPY --from=prod /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=prod /app/node_modules /app/node_modules
COPY --from=prod /app/dist /app/dist
EXPOSE 4000
CMD [ "node", "dist/src/index.js" ]