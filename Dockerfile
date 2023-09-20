FROM oven/bun:1.0.2 AS installer
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --production --frozen-lockfile
COPY tsconfig.json ./
COPY src src

FROM oven/bun:1.0.2 AS runner
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN chown bun:bun .
USER bun
COPY --from=installer /usr/src/app/node_modules node_modules/
COPY --from=installer /usr/src/app/package.json package.json
COPY src src
ENTRYPOINT [ "bun", "start-prod" ]