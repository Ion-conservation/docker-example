# Dockerized Full-Stack Development Toolkit

### **项目概述**

这是一个基于 Docker 的全栈开发工具链，旨在简化前端、后端和数据库的开发与部署流程。通过 Docker Compose 管理容器化服务，结合 Dev Container 实现容器内开发环境预配置，支持高效的代码拉取与依赖管理。项目采用多阶段构建优化镜像大小，并通过 SSH Agent 代理实现安全的代码访问。无论是个人开发者还是团队协作，该工具链都能提供一致、可移植的开发体验。

**特性**

- 前后端与数据库联通：通过 Docker Compose Network 实现服务间无缝通信。

- Dev Container 支持：预配置开发环境，内置插件支持，提升开发效率，无需手动执行 docker compose up。

- SSH Agent 代理：安全、高效地拉取私有仓库代码。

- 多阶段构建：通过 Dockerfile 优化镜像体积，减少资源占用。

- 依赖管理：使用 Docker Compose command 命令行安装依赖，确保环境轻量化。

- 可扩展性：灵活的配置支持自定义技术栈和服务。

**技术栈**

- Docker & Docker Compose

- Dev Container

- SSH Agent （未使用，因为没有在容器内拉取代码，而是使用本地代码）

- 多阶段构建（Multi-stage Builds）

**使用场景**

- 本地开发环境快速搭建

- 团队协作中的一致性开发体验

- CI/CD 流水线集成

---

### 注意事项

1. docker 容器无法热更新，需要配置 vite.config.js 中 server 的 watch 选项。在 Windows Linux 子系统（WSL）上使用 Vite 中提到该问题。

2. nodemon 也有热更新问题，也需要使用轮询进行更新。

3. 删除 MYSQL 容器的同时需要删除 MYSQL 卷，否则 MYSQL 容器的数据有问题。

4. 启动 MYSQL 容器时必须提供 MYSQL_ROOT_PASSWORD 配置，否则 Express 无法登录。

5. 只能使用 F1 > 输入并选择 Dev Containers: Open Folder in Container 启动文件夹，并且 devcontainer.json 中 dockerComposeFile 需要使用绝对路径。

---

### FAQ

#### 问题 1：为什么在 devcontainer.json、Dockerfile 和 docker-compose.yml 中，Dockerfile 执行 pnpm install 最合适。

**Dockerfile 中执行 pnpm install**

- 利用 Docker 缓存机制：COPY package\*.json ./ + RUN pnpm install 的层在 package.json 不变时可复用。
- 依赖嵌入镜像，构建完成后无需额外安装，启动更快。

**docker-compose.yml 中通过 command 执行 pnpm install**

- 优点：
  - 每次启动容器时都能保证依赖最新。
- 缺点：
  - 每次启动都执行 pnpm install，无法利用缓存，启动变慢。
  - 与镜像构建逻辑重复，可能导致不一致。

**devcontainer.json 中通过 postCreateCommand 执行 pnpm install**

- 优点：
  - 在容器创建后执行一次，确保卷挂载后的依赖一致。
  - 适合开发环境，配合 VS Code 使用。
- 缺点：
  - 不利用缓存，每次重建容器都重新安装。
  - 只在 Dev Container 模式下生效，不适用于非 VS Code 场景。

**最合适的选择：Dockerfile 中执行 pnpm install**

1. **缓存优势**：构建时缓存依赖层，加快后续构建速度。

2. **一致性**：依赖嵌入镜像，确保所有环境（开发、生产）使用相同的依赖版本。

3. **效率**：启动容器时无需重复安装。

> [!NOTE]
>
> 需要在 docker-compose.yml 文件中使用匿名卷接管 node_modules 目录，确保不被本地 node_modules 覆盖。

---

#### 问题 2：Docker 缓存机制是什么？

**Docker 缓存机制的原理**

Docker 在构建镜像时使用分层（Layer）机制，并通过缓存来加速构建过程。缓存的运作基于以下规则：

1. **指令顺序**：Docker 从上到下执行 Dockerfile 中的每条指令，每条指令生成一个镜像层。
2. **缓存命中**：如果某条指令及其依赖（包括之前的层和相关文件）没有变化，Docker 会复用上一次构建的缓存层，而不是重新执行。
3. **缓存失效**：如果某条指令或其依赖发生变化（比如文件内容修改），该指令及后续指令的缓存会失效，需要重新执行。

**为什么 `COPY package\*.json ./` 后立即安装依赖能加速构建**

这种顺序利用了 Docker 的缓存机制，具体原因如下：

1. COPY package\*.json ./
   - 只复制 package.json 和 package-lock.json（或 pnpm-lock.yaml），这些文件通常变化较少。
   - 如果这些文件没有修改，Docker 会缓存这一层。
2. RUN pnpm install
   - 在这一步安装依赖，生成 node_modules。
   - 如果 package\*.json 未变，这一层的缓存会被复用，跳过依赖安装过程（通常是构建中最耗时的部分）。
3. COPY . .
   - 最后复制完整代码（比如 src/、public/ 等）。
   - 项目代码经常变化，但因为它在 RUN pnpm install 之后，即使这一层缓存失效，也不会影响前面的依赖安装层。
