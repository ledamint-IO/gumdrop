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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionProvider = void 0;
const web3_js_1 = require("@safecoin/web3.js");
const react_1 = __importStar(require("react"));
const useConnection_1 = require("./useConnection");
const ConnectionProvider = ({ children, endpoint, config = { commitment: 'confirmed' }, }) => {
    const connection = (0, react_1.useMemo)(() => new web3_js_1.Connection(endpoint, config), [endpoint, config]);
    return react_1.default.createElement(useConnection_1.ConnectionContext.Provider, { value: { connection } }, children);
};
exports.ConnectionProvider = ConnectionProvider;
//# sourceMappingURL=ConnectionProvider.js.map