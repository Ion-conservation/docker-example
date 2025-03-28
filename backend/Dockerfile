FROM node:23.9.0-alpine AS base

RUN npm install -g pnpm

ENV PNPM_HOME=/root/.pnpm
ENV PATH=$PNPM_HOME:$PATH

# 更改 /app 的所有者为 node 用户
RUN chown -R node:node /app

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

FROM base AS development

RUN pnpm install -g nodemon

CMD ["pnpm", "run", "dev"]

FROM base AS production

RUN pnpm install pm2 -g

CMD ["pm2", "start", "ecosystem.config.js"]