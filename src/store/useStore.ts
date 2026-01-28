import { create } from 'zustand';
import { LaunchState } from '../types';

interface StoreState extends LaunchState {
  setPaid: (paid: boolean) => void;
  setLaunching: (launching: boolean) => void;
  setLaunched: (launched: boolean) => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  isPaid: false,
  isLaunching: false,
  hasLaunched: false,
  paymentAmount: 0.01, // 0.01 SOL
  setPaid: (paid) => set({ isPaid: paid }),
  setLaunching: (launching) => set({ isLaunching: launching }),
  setLaunched: (launched) => set({ hasLaunched: launched }),
  reset: () => set({ isPaid: false, isLaunching: false, hasLaunched: false }),
}));
