FROM node:20-alpine AS builder

WORKDIR /usr/app
COPY . .
RUN npm install --force
RUN npm run build

FROM node:20-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app/env.json ./
RUN npm install pm2 -g

CMD ["pm2-runtime", "server.js"]
