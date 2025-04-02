FROM node:23.9.0-alpine AS base

# 安装 pnpm
RUN npm install -g pnpm 

# 设置 pnpm 的全局入口
ENV PNPM_HOME=/root/.pnpm
# 设置 pnpm 的全局存储目录
ENV store-dir=/root/.pnpm-store
# 设置 pnpm 的环境变量
ENV PATH=$PNPM_HOME:$PATH

WORKDIR /app

COPY package*.json ./

ARG VITE_BASE_URL
ARG VITE_PORT

ENV VITE_API_URL=${VITE_BASE_URL}:${VITE_PORT}

# development
FROM base AS development

RUN pnpm install

CMD ["pnpm", "run", "dev"]

# build
FROM base AS build

RUN pnpm run build

# production
FROM nginx:1.27.4 AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]