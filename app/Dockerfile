FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src

RUN addgroup -S nodeapp && \
    adduser -S nodeuser -G nodeapp

USER nodeuser

EXPOSE 3000

CMD ["npm","start"]
