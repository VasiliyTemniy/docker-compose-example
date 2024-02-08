FROM node:18.16-alpine3.18 AS base-back

WORKDIR /usr/src/app


# Copy all except for .dockerignore'd
FROM base-back as copy-package-files-stage-back

COPY . .


# Install to have typescript; use frozen lockfile
FROM copy-package-files-stage-back as install-stage-back

RUN yarn install --frozen-lockfile


# Transpile ts to js
FROM install-stage-back AS build-stage-back

RUN yarn build


# From clean node image(base): copy transpiled js files + package.json + lockfile + static html
FROM base-back as copy-prod-stage-back

COPY --from=build-stage-back /usr/src/app/build .
COPY --from=build-stage-back /usr/src/app/package.json .
COPY --from=build-stage-back /usr/src/app/yarn.lock .
COPY --from=build-stage-back /usr/src/app/static ./static


# Install only production deps with frozen lockfile
FROM copy-prod-stage-back as install-prod-stage-back

RUN yarn install --frozen-lockfile --production

# Give node user access to static folder
RUN chown -R node:node /usr/src/app/static


FROM install-prod-stage-back as run-prod-back

USER node
CMD ["node", "./index.js"]