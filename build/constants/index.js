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
    name: 'Swivel Finance',
    version: '1.0.0',
    chainId: 5,
    verifyingContract: '0x6a6BeC42A5Dd6F2766F806F91Ad12034F43b6361',
};
exports.TYPES = {
    Order: [
        { name: 'key', type: 'string' },
        { name: 'maker', type: 'address' },
        { name: 'underlying', type: 'address' },
        { name: 'floating', type: 'bool' },
        { name: 'principal', type: 'string' },
        { name: 'interest', type: 'string' },
        { name: 'duration', type: 'string' },
        { name: 'expiry', type: 'string' },
    ],
};
