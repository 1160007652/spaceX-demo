import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { PAYMENT_AMOUNT, RECIPIENT_ADDRESS } from '../config/solana';
import { StarfieldBackground } from './StarfieldBackground';
import { buyTicket } from '../utils/program';
import './PaymentPanel.css';

export const PaymentPanel = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { connection } = useConnection();
  const { isPaid, setPaid, setLaunching } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [userName, setUserName] = useState('');

  // 获取余额
  useEffect(() => {
    if (!publicKey) return;
    
    const fetchBalance = async () => {
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch (err) {
        console.error('获取余额失败:', err);
      }
    };
    
    fetchBalance();
  }, [publicKey, connection]);

  const handlePayment = async () => {
    if (!publicKey) {
      setError('请先连接钱包');
      return;
    }

    if (!userName.trim()) {
      setError('请输入你的名称');
      return;
    }

    if (userName.length > 32) {
      setError('名称太长，最多32个字符');
      return;
    }

    setLoading(true);
    setError(null);
    let success = false;

    try {
      console.log('=== 开始购买船票 ===');
      console.log('旅行者:', userName);
      console.log('钱包:', publicKey.toBase58());
      console.log('接收方:', RECIPIENT_ADDRESS);
      console.log('金额:', PAYMENT_AMOUNT, 'SOL');
      console.log('网络: Devnet');
      
      // 检查余额
      const balance = await connection.getBalance(publicKey);
      console.log('当前余额:', balance / LAMPORTS_PER_SOL, 'SOL');
      
      if (balance < PAYMENT_AMOUNT * LAMPORTS_PER_SOL) {
        throw new Error('余额不足！请访问 https://faucet.solana.com/ 获取 Devnet 测试币');
      }
      
      console.log('调用智能合约...');
      
      // 通过智能合约购买船票
      const signature = await buyTicket(
        connection,
        wallet,
        userName.trim(),
        PAYMENT_AMOUNT,
        new PublicKey(RECIPIENT_ADDRESS)
      );
      
      console.log('✅ 交易已发送!');
      console.log('签名:', signature);
      console.log('🔗 查看: https://explorer.solana.com/tx/' + signature + '?cluster=devnet');
      
      console.log('✅ 船票购买成功!');
      console.log('=== 欢迎登船 ===');
      
      // 标记成功
      success = true;
      
      // 成功后启动火箭
      setPaid(true);
      setTimeout(() => setLaunching(true), 1000);
      
    } catch (err: any) {
      console.error('=== 购票失败 ===');
      console.error('错误对象:', err);
      console.error('错误类型:', err?.constructor?.name);
      console.error('错误消息:', err?.message);
      
      let errorMsg = '购票失败';
      
      if (err?.message?.includes('User rejected') || err?.message?.includes('User declined')) {
        errorMsg = '❌ 用户取消了交易';
      } else if (err?.message?.includes('insufficient') || err?.message?.includes('余额不足')) {
        errorMsg = '❌ 余额不足！\n请访问 https://faucet.solana.com/ 获取 Devnet 测试币';
      } else if (err?.message?.includes('Unexpected error')) {
        errorMsg = '❌ 网络错误！\n\n请检查：\n1. Phantom 钱包是否切换到 Devnet\n2. 刷新页面重试';
      } else if (err?.message?.includes('already in use')) {
        errorMsg = '❌ 你已经购买过船票了！';
      } else if (err?.message) {
        errorMsg = '❌ ' + err.message;
      }
      
      setError(errorMsg);
    } finally {
      // 只有在失败时才重置 loading 状态
      if (!success) {
        setLoading(false);
      }
    }
  };

  if (isPaid) return null;

  return (
    <>
      <StarfieldBackground />
      <div className="payment-panel">
      <div className="payment-card">
        <h1>🚀 SpaceX 太空之旅</h1>
        <p className="description">
          准备好开启你的太空冒险了吗？
        </p>
        
        <div className="network-badge">
          🎮 Devnet 娱乐模式
        </div>
        
        <div className="price">
          <span className="amount">{PAYMENT_AMOUNT}</span>
          <span className="currency">SOL</span>
        </div>
        
        {publicKey && balance !== null && (
          <div className="balance-info">
            💰 当前余额: {balance.toFixed(4)} SOL
            <div style={{ fontSize: '0.8rem', marginTop: '5px', opacity: 0.7 }}>
              (Devnet 测试币，无实际价值)
            </div>
          </div>
        )}
        
        {!publicKey ? (
          <p className="warning">请先连接 Solana 钱包</p>
        ) : (
          <>
            <div className="input-group">
              <label htmlFor="userName">👤 旅行者名称</label>
              <input
                id="userName"
                type="text"
                placeholder="输入你的名称（将显示在星际中）"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={32}
                disabled={loading}
                className="name-input"
              />
            </div>
            <button 
              className="launch-button"
              onClick={handlePayment}
              disabled={loading || !userName.trim()}
            >
              {loading ? '处理中...' : '🎫 购买船票并发射'}
            </button>
            <p className="info-text">
              💡 提示：请确保钱包切换到 Devnet 网络
            </p>
          </>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
    </>
  );
};
