FROM node:23.9.0-alpine AS base

RUN npm install -g pnpm && npm install -g git

# 设置 pnpm 的全局入口
ENV PNPM_HOME=/root/.pnpm
# 设置 pnpm 的全局存储目录
ENV store-dir=/root/.pnpm-store
# 设置 pnpm 的环境变量
ENV PATH=$PNPM_HOME:$PATH

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