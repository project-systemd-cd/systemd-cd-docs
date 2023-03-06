# Install dependencies only when needed
# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
RUN yarn global add pnpm
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Production image, copy all the files and run docusaurus
FROM nginx:1.23 AS runner
COPY --from=builder /app/build /usr/share/nginx/html