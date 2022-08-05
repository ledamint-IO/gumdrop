export declare function useAnchorWallet(): {
    publicKey: import("@safecoin/web3.js").PublicKey;
    signTransaction: (transaction: import("@safecoin/web3.js").Transaction) => Promise<import("@safecoin/web3.js").Transaction>;
    signAllTransactions: (transaction: import("@safecoin/web3.js").Transaction[]) => Promise<import("@safecoin/web3.js").Transaction[]>;
} | undefined;
