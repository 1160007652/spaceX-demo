import { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { getAllTravelers, getTravelersList, Traveler, TravelersList as TravelersListType } from '../utils/program';
import './TravelersList.css';

export const TravelersList = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [stats, setStats] = useState<TravelersListType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wallet.publicKey) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [travelersData, statsData] = await Promise.all([
          getAllTravelers(connection, wallet),
          getTravelersList(connection, wallet)
        ]);
        
        // 按时间倒序排列
        const sorted = travelersData.sort((a, b) => 
          b.timestamp.toNumber() - a.timestamp.toNumber()
        );
        
        setTravelers(sorted);
        setStats(statsData);
      } catch (error) {
        console.error('获取旅行者数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // 每30秒刷新一次
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [wallet.publicKey, connection]);

  if (!wallet.publicKey) return null;

  return (
    <div className="travelers-list-container">
      <div className="travelers-panel">
        <h2>🌟 太空旅行者名单</h2>
        
        {stats && (
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-label">总旅行者</span>
              <span className="stat-value">{stats.totalTravelers.toString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">总金额</span>
              <span className="stat-value">
                {(stats.totalAmount.toNumber() / 1_000_000_000).toFixed(2)} SOL
              </span>
            </div>
          </div>
        )}

        <div className="travelers-scroll">
          {loading ? (
            <div className="loading">加载中...</div>
          ) : travelers.length === 0 ? (
            <div className="empty">还没有旅行者，成为第一个吧！</div>
          ) : (
            <div className="travelers-grid">
              {travelers.map((traveler, index) => (
                <div key={traveler.wallet.toBase58()} className="traveler-card">
                  <div className="traveler-rank">#{index + 1}</div>
                  <div className="traveler-name">{traveler.name}</div>
                  <div className="traveler-wallet">
                    {traveler.wallet.toBase58().slice(0, 4)}...
                    {traveler.wallet.toBase58().slice(-4)}
                  </div>
                  <div className="traveler-amount">
                    {(traveler.amount.toNumber() / 1_000_000_000).toFixed(2)} SOL
                  </div>
                  <div className="traveler-time">
                    {new Date(traveler.timestamp.toNumber() * 1000).toLocaleString('zh-CN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
