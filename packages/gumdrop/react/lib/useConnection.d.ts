/// <reference types="react" />
import { Connection } from '@safecoin/web3.js';
export interface ConnectionContextState {
    connection: Connection;
}
export declare const ConnectionContext: import("react").Context<ConnectionContextState>;
export declare function useConnection(): ConnectionContextState;
