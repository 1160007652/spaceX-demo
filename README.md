# 🚀 SpaceX 太空之旅

基于 Solana 区块链的 SpaceX 太空旅行体验项目。

## 📹 演示视频

https://github.com/user-attachments/assets/video.mov

或查看本地视频：[public/video.mov](./public/video.mov)

## 功能特性

- 🔗 连接 Solana 钱包（支持 Phantom、Solflare 等）
- 💰 支付 SOL 代币购买太空船票
- 🚀 震撼的 3D 火箭发射动画
- 🌌 绚丽多彩的星空背景
- 🪐 星球、UFO、战舰等星际元素
- ⭐ 粒子特效和火焰效果
- 🎮 Devnet 娱乐模式（测试环境）

## 网络配置

⚠️ **当前运行在 Solana Devnet 测试网络**

🎮 这是娱乐体验项目，使用的是测试币，无实际价值。

## 技术栈

- React 19 + TypeScript
- Three.js + React Three Fiber
- Solana Web3.js (Devnet)
- Wallet Adapter (Phantom、Solflare)
- Zustand 状态管理
- Vite 构建工具
- Canvas 2D 动画

## 视觉特效

### 购买页面
- ✨ 300 颗彩色星星（3D 深度效果）
- 🪐 3 颗彩色星球（带星环）
- 🛸 2 个 UFO 外星飞船
- 🚀 2 艘战舰
- 💎 玻璃态支付卡片

### 飞行场景
- 🌟 5000 颗多彩星空
- 🌌 梦幻星云效果
- 💡 彩色灯光系统
- 🔥 火箭发射特效
- 📹 相机跟随动画

## 开始使用

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置钱包地址

编辑 `src/config/solana.ts`，将 `RECIPIENT_ADDRESS` 替换为你的 Solana 钱包地址。

### 3. 启动开发服务器

```bash
pnpm dev
```

### 4. 构建生产版本

```bash
pnpm build
```

## 使用说明

1. 打开应用后，点击右上角连接 Solana 钱包
2. **确保钱包切换到 Devnet 网络**（右上角会显示 🎮 Devnet）
3. 从 [Solana Faucet](https://faucet.solana.com/) 获取测试币（选择 Devnet）
4. 连接成功后，点击"购买船票并发射"按钮
5. 确认支付 0.0001 SOL（Devnet 测试币）
6. 享受震撼的太空发射体验！

## 注意事项

- 🎮 当前使用 **Solana Devnet** 测试网络
- 💰 测试币无实际价值，可放心体验
- 🔗 需要在钱包中有足够的 SOL 测试币
- 📱 可以从 [Solana Faucet](https://faucet.solana.com/) 获取测试币（选择 Devnet）
- ⚠️ **重要**：Phantom 钱包需要切换到 Devnet 网络

## 项目文档

- 📖 [快速启动指南](./QUICK_CHECK.md)
- 🎨 [视觉效果说明](./VISUAL_EFFECTS.md)
- 🌌 [背景元素说明](./BACKGROUND_ELEMENTS.md)
- 🎮 [Devnet 提示说明](./DEVNET_NOTICE.md)
- 🔧 [故障排除](./TROUBLESHOOTING.md)
- 🔄 [网络切换指南](./NETWORK_SWITCH.md)

## 开发指南

### 修改支付金额
```typescript
// src/config/solana.ts
export const PAYMENT_AMOUNT = 0.001; // 修改为你想要的金额
```

### 修改收款地址
```typescript
// src/config/solana.ts
export const RECIPIENT_ADDRESS = '你的钱包地址';
```

### 切换网络
查看 [NETWORK_SWITCH.md](./NETWORK_SWITCH.md) 了解如何切换到 Testnet 或 Mainnet。

## 许可证

MIT License

---

**享受你的星际之旅！** 🚀✨🪐🛸
