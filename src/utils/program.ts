import { PublicKey, Connection, SystemProgram } from '@solana/web3.js';
import { AnchorProvider, Program, BN } from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import IDL from '../idl/space_travelers.json';

// 程序 ID
export const PROGRAM_ID = new PublicKey('8MHC4NHANThLdyyaJFmbCo5UB1fNoWAKw2twVyPGjGxr');

export interface Traveler {
  wallet: PublicKey;
  name: string;
  amount: BN;
  timestamp: BN;
  bump: number;
}

export interface TravelersList {
  authority: PublicKey;
  totalTravelers: BN;
  totalAmount: BN;
}

// 获取 PDA 地址
export function getTravelerPDA(wallet: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('traveler'), wallet.toBuffer()],
    PROGRAM_ID
  );
}

export function getTravelersListPDA(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('travelers_list')],
    PROGRAM_ID
  );
}

// 创建 Program 实例
export function getProgram(connection: Connection, wallet: WalletContextState) {
  const provider = new AnchorProvider(
    connection,
    wallet as any,
    { commitment: 'confirmed' }
  );
  return new Program(IDL as any, provider);
}

// 初始化程序（只需要执行一次）
export async function initializeProgram(
  connection: Connection,
  wallet: WalletContextState
): Promise<string> {
  if (!wallet.publicKey) throw new Error('钱包未连接');
  
  const program = getProgram(connection, wallet);
  const [travelersListPDA] = getTravelersListPDA();

  try {
    const tx = await (program.methods as any)
      .initialize()
      .accounts({
        travelersList: travelersListPDA,
        authority: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log('✅ 程序初始化成功!');
    console.log('交易签名:', tx);
    return tx;
  } catch (error: any) {
    // 如果已经初始化过，会报错，这是正常的
    if (error.message?.includes('already in use')) {
      console.log('程序已经初始化过了');
      return 'already_initialized';
    }
    console.error('初始化失败:', error);
    throw error;
  }
}

// 购买船票
export async function buyTicket(
  connection: Connection,
  wallet: WalletContextState,
  name: string,
  amount: number, // SOL
  recipient: PublicKey
): Promise<string> {
  if (!wallet.publicKey) throw new Error('钱包未连接');
  
  console.log('=== 开始购买船票 ===');
  console.log('旅行者:', name);
  console.log('钱包:', wallet.publicKey.toBase58());
  console.log('金额:', amount, 'SOL');
  
  const program = getProgram(connection, wallet);
  const [travelerPDA] = getTravelerPDA(wallet.publicKey);
  const [travelersListPDA] = getTravelersListPDA();

  const amountLamports = new BN(amount * 1_000_000_000);

  try {
    const tx = await (program.methods as any)
      .buyTicket(name, amountLamports)
      .accounts({
        traveler: travelerPDA,
        travelersList: travelersListPDA,
        payer: wallet.publicKey,
        recipient: recipient,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log('✅ 船票购买成功!');
    console.log('交易签名:', tx);
    console.log('🔗 查看: https://explorer.solana.com/tx/' + tx + '?cluster=devnet');
    
    return tx;
  } catch (error: any) {
    console.error('购票失败:', error);
    
    // 友好的错误提示
    if (error.message?.includes('already in use')) {
      throw new Error('你已经购买过船票了！每个钱包只能购买一次。');
    } else if (error.message?.includes('insufficient')) {
      throw new Error('余额不足！请确保有足够的 SOL。');
    } else if (error.message?.includes('NameTooLong')) {
      throw new Error('名称太长，最多32个字符。');
    } else if (error.message?.includes('InsufficientPayment')) {
      throw new Error('支付金额不足，最少需要 0.01 SOL。');
    }
    
    throw error;
  }
}

// 获取旅行者信息
export async function getTraveler(
  connection: Connection,
  wallet: WalletContextState,
  travelerWallet: PublicKey
): Promise<Traveler | null> {
  const program = getProgram(connection, wallet);
  const [travelerPDA] = getTravelerPDA(travelerWallet);

  try {
    const traveler = await (program.account as any).traveler.fetch(travelerPDA);
    return traveler as Traveler;
  } catch (e) {
    console.log('旅行者不存在:', travelerWallet.toBase58());
    return null;
  }
}

// 获取所有旅行者
export async function getAllTravelers(
  connection: Connection,
  wallet: WalletContextState
): Promise<Traveler[]> {
  const program = getProgram(connection, wallet);

  try {
    const travelers = await (program.account as any).traveler.all();
    console.log(`找到 ${travelers.length} 个旅行者`);
    return travelers.map((t: any) => t.account as Traveler);
  } catch (e) {
    console.error('获取旅行者列表失败:', e);
    return [];
  }
}

// 获取旅行者列表统计
export async function getTravelersList(
  connection: Connection,
  wallet: WalletContextState
): Promise<TravelersList | null> {
  const program = getProgram(connection, wallet);
  const [travelersListPDA] = getTravelersListPDA();

  try {
    const list = await (program.account as any).travelersList.fetch(travelersListPDA);
    return list as TravelersList;
  } catch (e) {
    console.log('统计信息不存在，程序可能还未初始化');
    return null;
  }
}
