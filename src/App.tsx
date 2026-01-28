import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletConnect } from './components/WalletConnect';
import { PaymentPanel } from './components/PaymentPanel';
import { SpaceScene } from './components/SpaceScene';
import { SuccessMessage } from './components/SuccessMessage';
import { SOLANA_NETWORK } from './config/solana';
import './App.css';

function App() {
  // 使用统一的网络配置
  const endpoint = useMemo(() => SOLANA_NETWORK, []);
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="app">
            <WalletConnect />
            <PaymentPanel />
            <SpaceScene />
            <SuccessMessage />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
