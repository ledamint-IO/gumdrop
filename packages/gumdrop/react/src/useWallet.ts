import {
    MessageSignerWalletAdapterProps,
    SignerWalletAdapterProps,
    WalletAdapterProps,
} from '@j0nnyboi/wallet-adapter-base';
import { Wallet, WalletName } from '@j0nnyboi/wallet-adapter-wallets';
import { createContext, useContext } from 'react';

export interface WalletContextState extends WalletAdapterProps {
    wallets: Wallet[];
    autoConnect: boolean;

    wallet: Wallet | undefined;
    adapter: ReturnType<Wallet['adapter']> | undefined;
    disconnecting: boolean;

    select(walletName: WalletName): void;

    signTransaction: SignerWalletAdapterProps['signTransaction'] | undefined;
    signAllTransactions: SignerWalletAdapterProps['signAllTransactions'] | undefined;

    signMessage: MessageSignerWalletAdapterProps['signMessage'] | undefined;
}

export const WalletContext = createContext<WalletContextState>({} as WalletContextState);

export function useWallet(): WalletContextState {
    return useContext(WalletContext);
}
