import { MessageSignerWalletAdapter, SignerWalletAdapter, WalletAdapter } from '@j0nnyboi/wallet-adapter-base';
import { SolletWalletAdapterConfig } from '@j0nnyboi/wallet-adapter-safecoin';
export declare enum WalletName {
    Sollet = "Sollet",
}
export interface Wallet {
    name: WalletName;
    url: string;
    icon: string;
    adapter: () => WalletAdapter | SignerWalletAdapter | MessageSignerWalletAdapter;
}

export declare const getSolletWallet: ({ provider, ...config }?: SolletWalletAdapterConfig) => Wallet;
