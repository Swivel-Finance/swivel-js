"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = exports.DOMAIN = void 0;
__exportStar(require("./swivel"), exports);
exports.DOMAIN = {
    name: 'My Messaging App',
    version: '1',
    chainId: 42,
    verifyingContract: '0x7753cfAD258eFbC52A9A1452e42fFbce9bE486cb',
};
exports.TYPES = {
    Order: [
        { name: 'key', type: 'string' },
        { name: 'maker', type: 'address' },
        { name: 'underlying', type: 'address' },
        { name: 'floating', type: 'bool' },
        { name: 'principal', type: 'uint256' },
        { name: 'interest', type: 'uint256' },
        { name: 'duration', type: 'uint256' },
        { name: 'expiry', type: 'uint256' },
    ],
};
