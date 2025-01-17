"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProvider = void 0;
const wallet_adapter_base_1 = require("@j0nnyboi/wallet-adapter-base");
const react_1 = __importStar(require("react"));
const errors_1 = require("./errors");
const useLocalStorage_1 = require("./useLocalStorage");
const useWallet_1 = require("./useWallet");
const initialState = {
    ready: false,
    publicKey: null,
    connected: false,
    autoApprove: false,
};
const WalletProvider = ({ children, wallets, autoConnect = false, onError = (error) => console.error(error), localStorageKey = 'walletName', }) => {
    const [name, setName] = (0, useLocalStorage_1.useLocalStorage)(localStorageKey, null);
    const [wallet, setWallet] = (0, react_1.useState)();
    const [adapter, setAdapter] = (0, react_1.useState)();
    const [connecting, setConnecting] = (0, react_1.useState)(false);
    const [disconnecting, setDisconnecting] = (0, react_1.useState)(false);
    const [{ ready, publicKey, connected, autoApprove }, setState] = (0, react_1.useState)(initialState);
    const walletsByName = (0, react_1.useMemo)(() => wallets.reduce((walletsByName, wallet) => {
        walletsByName[wallet.name] = wallet;
        return walletsByName;
    }, {}), [wallets]);
    const select = (0, react_1.useCallback)((selected) => __awaiter(void 0, void 0, void 0, function* () {
        if (name === selected)
            return;
        if (adapter)
            yield adapter.disconnect();
        setName(selected);
    }), [name, adapter, setName]);
    const reset = (0, react_1.useCallback)(() => {
        setConnecting(false);
        setDisconnecting(false);
        setState(initialState);
    }, [setConnecting, setDisconnecting, setState]);
    const onReady = (0, react_1.useCallback)(() => setState((state) => (Object.assign(Object.assign({}, state), { ready: true }))), [setState]);
    const onConnect = (0, react_1.useCallback)(() => {
        if (!adapter)
            return;
        const { ready, publicKey, autoApprove } = adapter;
        setState({ connected: true, ready, publicKey, autoApprove });
    }, [adapter, setState]);
    const onDisconnect = (0, react_1.useCallback)(() => reset(), [reset]);
    const connect = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (connecting || disconnecting || connected)
            return;
        if (!wallet || !adapter) {
            const error = new errors_1.WalletNotSelectedError();
            onError(error);
            throw error;
        }
        if (!ready) {
            if (typeof window !== 'undefined') {
                window.open(wallet.url, '_blank');
            }
            const error = new wallet_adapter_base_1.WalletNotReadyError();
            onError(error);
            throw error;
        }
        setConnecting(true);
        try {
            yield adapter.connect();
        }
        finally {
            setConnecting(false);
        }
    }), [connecting, disconnecting, connected, wallet, adapter, ready, onError, setConnecting]);
    const disconnect = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (disconnecting)
            return;
        if (!adapter) {
            yield select(null);
            return;
        }
        setDisconnecting(true);
        try {
            yield adapter.disconnect();
        }
        finally {
            setDisconnecting(false);
            yield select(null);
        }
    }), [disconnecting, adapter, select, setDisconnecting]);
    const sendTransaction = (0, react_1.useCallback)((transaction, connection, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (!adapter) {
            const error = new errors_1.WalletNotSelectedError();
            onError(error);
            throw error;
        }
        if (!connected) {
            const error = new wallet_adapter_base_1.WalletNotConnectedError();
            onError(error);
            throw error;
        }
        return yield adapter.sendTransaction(transaction, connection, options);
    }), [adapter, onError, connected]);
    const signTransaction = (0, react_1.useMemo)(() => adapter && 'signTransaction' in adapter
        ? (transaction) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected) {
                const error = new wallet_adapter_base_1.WalletNotConnectedError();
                onError(error);
                throw error;
            }
            return yield adapter.signTransaction(transaction);
        })
        : undefined, [adapter, onError, connected]);
    const signAllTransactions = (0, react_1.useMemo)(() => adapter && 'signAllTransactions' in adapter
        ? (transactions) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected) {
                const error = new wallet_adapter_base_1.WalletNotConnectedError();
                onError(error);
                throw error;
            }
            return yield adapter.signAllTransactions(transactions);
        })
        : undefined, [adapter, onError, connected]);
    const signMessage = (0, react_1.useMemo)(() => adapter && 'signMessage' in adapter
        ? (message) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected) {
                const error = new wallet_adapter_base_1.WalletNotConnectedError();
                onError(error);
                throw error;
            }
            return yield adapter.signMessage(message);
        })
        : undefined, [adapter, onError, connected]);
    // Reset state and set the wallet, adapter, and ready state when the name changes
    (0, react_1.useEffect)(() => {
        reset();
        const wallet = name ? walletsByName[name] : undefined;
        const adapter = wallet ? wallet.adapter() : undefined;
        setWallet(wallet);
        setAdapter(adapter);
        setState((state) => (Object.assign(Object.assign({}, state), { ready: !!(adapter === null || adapter === void 0 ? void 0 : adapter.ready) })));
    }, [reset, name, walletsByName, setWallet, setAdapter, setState]);
    // Setup and teardown event listeners when the adapter changes
    (0, react_1.useEffect)(() => {
        if (adapter) {
            adapter.on('ready', onReady);
            adapter.on('connect', onConnect);
            adapter.on('disconnect', onDisconnect);
            adapter.on('error', onError);
            return () => {
                adapter.off('ready', onReady);
                adapter.off('connect', onConnect);
                adapter.off('disconnect', onDisconnect);
                adapter.off('error', onError);
            };
        }
    }, [adapter, onReady, onConnect, onDisconnect, onError]);
    // If autoConnect is enabled, try to connect when the adapter changes and is ready
    (0, react_1.useEffect)(() => {
        if (autoConnect && adapter && ready) {
            (function () {
                return __awaiter(this, void 0, void 0, function* () {
                    setConnecting(true);
                    try {
                        yield adapter.connect();
                    }
                    catch (error) {
                        // Don't throw error, but onError will still be called
                    }
                    finally {
                        setConnecting(false);
                    }
                });
            })();
        }
    }, [autoConnect, adapter, ready, setConnecting]);
    return (react_1.default.createElement(useWallet_1.WalletContext.Provider, { value: {
            wallets,
            autoConnect,
            select,
            wallet,
            adapter,
            publicKey,
            ready,
            connecting,
            disconnecting,
            connected,
            autoApprove,
            connect,
            disconnect,
            sendTransaction,
            signTransaction,
            signAllTransactions,
            signMessage,
        } }, children));
};
exports.WalletProvider = WalletProvider;
//# sourceMappingURL=WalletProvider.js.map