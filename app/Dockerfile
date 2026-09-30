# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src

# Stage 2: Runtime
FROM node:22-alpine

# Metadata
LABEL maintainer="Fernando Martínez Altolaguirre"
LABEL description="TechWave DevOps Platform - Node.js Application"
LABEL version="1.0.0"

WORKDIR /app

# Copy from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

# Create non-root user with minimal privileges
RUN addgroup -S -g 1001 nodeapp && \
    adduser -S -u 1001 -G nodeapp nodeuser && \
    chown -R nodeuser:nodeapp /app

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["node", "src/server.js"]
