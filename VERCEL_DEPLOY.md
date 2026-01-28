# Vercel 部署指南

## 问题已解决 ✅

**问题**: 生产环境显示 `Buffer is not defined`  
**原因**: Solana 库依赖 Node.js 的 Buffer，但浏览器环境没有  
**解决**: 添加了 Buffer polyfill

## 已完成的修复

1. ✅ 安装 `vite-plugin-node-polyfills` 插件
2. ✅ 安装 `buffer` 包
3. ✅ 配置 `vite.config.ts` 启用 polyfills
4. ✅ 在 `main.tsx` 中初始化全局 Buffer
5. ✅ 移除钱包连接限制，允许未连接时也显示列表
6. ✅ 添加详细的调试日志

## 部署步骤

### 1. 提交代码到 Git

```bash
git add .
git commit -m "fix: 添加 Buffer polyfill 修复生产环境问题"
git push
```

### 2. Vercel 自动部署

如果已经连接了 Git 仓库，Vercel 会自动触发部署。

### 3. 手动部署（可选）

```bash
# 本地构建测试
pnpm build

# 预览构建结果
pnpm preview

# 使用 Vercel CLI 部署
npx vercel --prod
```

## 环境变量配置（可选但推荐）

在 Vercel 项目设置中添加环境变量，避免 RPC 限流：

1. 进入 Vercel 项目 → Settings → Environment Variables
2. 添加：
   ```
   Name: VITE_SOLANA_RPC_URL
   Value: https://api.devnet.solana.com
   ```
   
   或使用付费 RPC（推荐）：
   ```
   Name: VITE_SOLANA_RPC_URL
   Value: https://devnet.helius-rpc.com/?api-key=你的密钥
   ```

3. 重新部署

## 验证部署

部署完成后：

1. 访问生产环境 URL
2. 打开浏览器控制台（F12）
3. 应该能看到：
   - ✅ `🔍 开始获取旅行者数据...`
   - ✅ `📡 正在连接程序...`
   - ✅ `✅ 找到 X 个旅行者`
4. 页面应该显示旅行者名单

## 如果还有问题

### 清除 Vercel 缓存

有时需要清除构建缓存：

1. Vercel 项目 → Deployments
2. 点击最新部署 → 右上角三个点 → Redeploy
3. 勾选 "Clear cache and redeploy"

### 检查构建日志

在 Vercel 部署页面查看构建日志，确保：
- ✅ 没有 TypeScript 错误
- ✅ 没有依赖安装错误
- ✅ Vite 构建成功

### 本地测试生产构建

```bash
# 构建
pnpm build

# 预览（模拟生产环境）
pnpm preview

# 访问 http://localhost:4173
# 打开控制台检查是否有错误
```

## 性能优化建议

当前构建包较大（1.7MB），可以考虑：

1. **代码分割**：使用动态导入
   ```typescript
   const SpaceScene = lazy(() => import('./components/SpaceScene'));
   ```

2. **使用付费 RPC**：避免公共节点限流

3. **启用 CDN 缓存**：Vercel 默认已启用

## 常见问题

**Q: 部署后还是看不到列表？**  
A: 检查浏览器控制台的错误信息，可能是 RPC 限流

**Q: 钱包连接失败？**  
A: 确保使用 HTTPS，某些钱包不支持 HTTP

**Q: 数据加载很慢？**  
A: 使用付费 RPC 节点，公共节点有延迟

## 联系支持

如果问题仍然存在，提供以下信息：
- Vercel 部署 URL
- 浏览器控制台截图
- Vercel 构建日志
