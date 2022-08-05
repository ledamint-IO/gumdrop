import { WalletError } from '@j0nnyboi/wallet-adapter-base';
import { Wallet } from '@j0nnyboi/wallet-adapter-wallets';
import { FC, ReactNode } from 'react';
export interface WalletProviderProps {
    children: ReactNode;
    wallets: Wallet[];
    autoConnect?: boolean;
    onError?: (error: WalletError) => void;
    localStorageKey?: string;
}
export declare const WalletProvider: FC<WalletProviderProps>;
