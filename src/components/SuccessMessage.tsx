import { useStore } from '../store/useStore';
import './SuccessMessage.css';

export const SuccessMessage = () => {
  const { hasLaunched, reset } = useStore();

  if (!hasLaunched) return null;

  return (
    <div className="success-overlay">
      <div className="success-card">
        <h1>🎉 恭喜！</h1>
        <p>你已成功抵达太空！</p>
        <p className="subtitle">感谢选择 SpaceX 太空之旅</p>
        <p className="devnet-note">
          🎮 这是 Devnet 娱乐体验，未使用真实 SOL
        </p>
        <button className="restart-button" onClick={reset}>
          🔄 再来一次
        </button>
      </div>
    </div>
  );
};
