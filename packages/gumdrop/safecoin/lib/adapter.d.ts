import { BaseMessageSignerWalletAdapter, WalletAdapterNetwork } from '@j0nnyboi/wallet-adapter-base';
import { PublicKey, Transaction } from '@safecoin/web3.js';
interface SolletWallet {
    postMessage(...args: unknown[]): unknown;
}
export interface SolletWalletAdapterConfig {
    provider?: string | SolletWallet;
    network?: WalletAdapterNetwork;
    pollInterval?: number;
    pollCount?: number;
}
export declare class SolletWalletAdapter extends BaseMessageSignerWalletAdapter {
    private _provider;
    private _network;
    private _connecting;
    private _wallet;
    constructor(config?: SolletWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get ready(): boolean;
    get connecting(): boolean;
    get connected(): boolean;
    get autoApprove(): boolean;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    private _disconnected;
}
export {};
