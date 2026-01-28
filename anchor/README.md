# SpaceX Space Travelers - Solana 智能合约

这是一个 Solana 智能合约（Program），用于记录所有购买 SpaceX 太空船票的旅行者。

## 功能

- 记录每个旅行者的名称、钱包地址、支付金额和时间戳
- 统计总旅行者数量和总支付金额
- 防止重复购买（每个钱包只能购买一次）
- 支付金额直接转账到指定接收地址

## 前置要求

1. 安装 Rust
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. 安装 Solana CLI
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

3. 安装 Anchor
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

## 部署步骤

### 1. 配置 Solana CLI 到 Devnet

```bash
solana config set --url devnet
```

### 2. 创建钱包（如果还没有）

```bash
solana-keygen new
```

### 3. 获取 Devnet 测试币

```bash
solana airdrop 2
```

### 4. 构建程序

```bash
cd anchor
anchor build
```

### 5. 获取程序 ID

```bash
solana address -k target/deploy/space_travelers-keypair.json
```

将输出的地址复制，然后：

1. 更新 `anchor/programs/space-travelers/src/lib.rs` 中的 `declare_id!("...")`
2. 更新 `anchor/Anchor.toml` 中的 `space_travelers = "..."`
3. 更新 `src/utils/program.ts` 中的 `PROGRAM_ID`

### 6. 重新构建

```bash
anchor build
```

### 7. 部署到 Devnet

```bash
anchor deploy
```

### 8. 初始化程序

部署后，需要初始化程序（只需要执行一次）：

```bash
anchor run initialize
```

或者在前端代码中调用 `initializeProgram()` 函数。

## 测试

```bash
anchor test
```

## 程序账户结构

### Traveler（旅行者账户）
- `wallet`: 旅行者的钱包地址（32 bytes）
- `name`: 旅行者名称（最多 32 字符）
- `amount`: 支付金额（u64）
- `timestamp`: 购买时间戳（i64）
- `bump`: PDA bump（u8）

### TravelersList（全局统计账户）
- `authority`: 管理员地址（32 bytes）
- `total_travelers`: 总旅行者数量（u64）
- `total_amount`: 总支付金额（u64）

## PDA 种子

- 旅行者账户: `["traveler", wallet_pubkey]`
- 全局统计账户: `["travelers_list"]`

## 错误代码

- `6000`: 名称太长（最多 32 字符）
- `6001`: 支付金额不足（最少 0.01 SOL）

## 前端集成

前端代码已经集成在 `src/utils/program.ts` 中，主要函数：

- `buyTicket()`: 购买船票
- `getTraveler()`: 获取单个旅行者信息
- `getAllTravelers()`: 获取所有旅行者
- `getTravelersList()`: 获取统计信息
- `initializeProgram()`: 初始化程序（只需执行一次）

## 注意事项

1. 每个钱包只能购买一次船票
2. 最少支付金额为 0.01 SOL
3. 名称最多 32 个字符
4. 部署后记得更新所有地方的程序 ID
5. 初始化程序只需要执行一次

## 查看链上数据

```bash
# 查看程序账户
solana account <PROGRAM_ID>

# 查看旅行者列表
solana account <TRAVELERS_LIST_PDA>

# 查看特定旅行者
solana account <TRAVELER_PDA>
```

## Solana Explorer

部署后可以在 Solana Explorer 查看：
https://explorer.solana.com/address/<PROGRAM_ID>?cluster=devnet
