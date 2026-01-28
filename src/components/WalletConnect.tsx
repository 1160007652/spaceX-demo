import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './WalletConnect.css';

export const WalletConnect = () => {
  return (
    <div className="wallet-connect-container">
      <div className="network-indicator">
        🎮 Devnet
      </div>
      <WalletMultiButton />
    </div>
  );
};
