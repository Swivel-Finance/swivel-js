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
exports.TYPES = exports.DOMAIN_VERSION = exports.DOMAIN_NAME = void 0;
__exportStar(require("./swivel"), exports);
exports.DOMAIN_NAME = 'Swivel Finance';
exports.DOMAIN_VERSION = '2.0.0';
exports.TYPES = {
    Order: [
        { name: 'key', type: 'bytes32' },
        { name: 'maker', type: 'address' },
        { name: 'underlying', type: 'address' },
        { name: 'vault', type: 'bool' },
        { name: 'exit', type: 'bool' },
        { name: 'principal', type: 'uint256' },
        { name: 'premium', type: 'uint256' },
        { name: 'maturity', type: 'uint256' },
        { name: 'expiry', type: 'uint256' },
    ],
};
