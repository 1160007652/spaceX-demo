# 🚀 SpaceX 太空旅行 - Solana 区块链项目

一个基于 Solana 区块链的互动式太空旅行体验，用户可以购买"太空船票"，观看 3D 火箭发射动画，并在星际中看到所有旅行者的名单。

![SpaceX Lottery](https://img.shields.io/badge/Solana-Devnet-purple)
![React](https://img.shields.io/badge/React-19.2-blue)
![Three.js](https://img.shields.io/badge/Three.js-3D-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## 📹 演示视频

https://github.com/user-attachments/assets/video.mov

或查看本地视频：[public/video.mov](./public/video.mov)

## ✨ 特性

- 🎨 **绚丽的 3D 星空场景** - 使用 Three.js 和 React Three Fiber
- 🚀 **火箭发射动画** - 逼真的 SpaceX 火箭模型和发射效果
- 💰 **Solana 支付集成** - 使用 Phantom 钱包支付
- 👥 **旅行者名单** - 实时显示所有购买船票的用户
- 📊 **统计信息** - 总旅行者数和总支付金额
- 🎮 **Devnet 测试** - 使用测试币，无需真实 SOL
- 🔗 **智能合约就绪** - 包含完整的 Solana Program 代码

## 🎯 快速开始

### 前置要求

- Node.js 18+
- pnpm（推荐）或 npm
- Phantom 钱包浏览器扩展

### 安装

```bash
# 安装依赖
pnpm install
```

### 配置

1. 打开 `src/config/solana.ts`
2. 将 `RECIPIENT_ADDRESS` 改成你的 Solana 地址：

```typescript
export const RECIPIENT_ADDRESS = 'your-wallet-address-here';
```

### 运行

```bash
# 开发模式
pnpm run dev

# 构建生产版本
pnpm run build

# 预览生产版本
pnpm run preview
```

### 使用

1. 打开浏览器访问 `http://localhost:5173`
2. 安装并连接 Phantom 钱包
3. 切换钱包到 **Devnet** 网络
4. 从 [Solana Faucet](https://faucet.solana.com/) 获取测试币
5. 输入你的名称
6. 点击"购买船票并发射"
7. 在钱包中确认交易
8. 观看火箭发射！🚀

## 📁 项目结构

```
spacex-lottery/
├── src/
│   ├── components/          # React 组件
│   │   ├── PaymentPanel.tsx       # 支付面板
│   │   ├── TravelersList.tsx      # 旅行者列表
│   │   ├── SpaceScene.tsx         # 3D 场景
│   │   ├── SpaceXRocket.tsx       # 火箭模型
│   │   ├── WalletConnect.tsx      # 钱包连接
│   │   └── ...
│   ├── utils/
│   │   └── program.ts       # 智能合约集成
│   ├── store/
│   │   └── useStore.ts      # 状态管理（Zustand）
│   ├── config/
│   │   └── solana.ts        # Solana 配置
│   └── types/
│       └── index.ts         # TypeScript 类型
├── anchor/                  # Solana 智能合约
│   ├── programs/
│   │   └── space-travelers/
│   │       └── src/
│   │           └── lib.rs   # Rust 合约代码
│   ├── Anchor.toml
│   └── Cargo.toml
└── public/
```

## 🔧 技术栈

### 前端
- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Three.js** - 3D 图形
- **React Three Fiber** - React 的 Three.js 封装
- **Zustand** - 状态管理
- **Framer Motion** - 动画

### 区块链
- **Solana Web3.js** - Solana JavaScript SDK
- **Wallet Adapter** - 钱包集成
- **Anchor** - Solana 智能合约框架
- **Rust** - 智能合约语言

## 📚 文档

- [快速开始指南](./QUICK_START.md) - 5分钟上手
- [合约集成说明](./CONTRACT_INTEGRATION.md) - 了解当前实现和未来规划
- [部署指南](./DEPLOYMENT_GUIDE.md) - 如何部署智能合约
- [合约 README](./anchor/README.md) - 智能合约详细说明

## 🎮 当前实现

### ✅ 已完成
- Solana 钱包连接（Phantom、Solflare）
- 用户名称输入（最多32字符）
- SOL 支付功能（0.01 SOL）
- 3D 火箭发射动画
- 绚丽星空背景（星星、星球、UFO、战舰）
- 旅行者列表显示
- 实时统计信息
- 响应式设计

### 🚧 待完成（需要部署合约）
- 链上数据存储
- 跨设备数据同步
- 防止重复购买
- 更多链上功能

## 💾 数据存储

### 当前方案（localStorage）
- 数据存储在浏览器本地
- 快速开发和测试
- 适合演示和原型

### 未来方案（智能合约）
- 数据永久存储在 Solana 链上
- 全网同步
- 防篡改
- 需要部署合约

查看 [CONTRACT_INTEGRATION.md](./CONTRACT_INTEGRATION.md) 了解详情。

## 🚀 部署

### Vercel（推荐）
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

### Netlify
1. 推送代码到 GitHub
2. 在 Netlify 导入项目
3. 构建命令：`pnpm run build`
4. 发布目录：`dist`

### 智能合约部署
查看 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🔐 安全提示

⚠️ **重要**：
- 当前版本仅用于 Devnet 测试
- 不要在主网使用未经审计的代码
- 保管好你的钱包私钥
- 测试币没有实际价值

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request 或 Issue。

## 📝 许可证

MIT License

## 🙏 致谢

- [Solana](https://solana.com/) - 高性能区块链
- [Anchor](https://www.anchor-lang.com/) - Solana 开发框架
- [Three.js](https://threejs.org/) - 3D 图形库
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React 3D 渲染

---

**享受你的太空之旅！** 🚀✨🌟
