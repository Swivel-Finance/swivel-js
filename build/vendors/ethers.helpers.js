"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderKey = void 0;
const ethers_1 = require("ethers");
const createOrderKey = (address) => {
    return ethers_1.utils.keccak256(ethers_1.utils.toUtf8Bytes(address + new Date().getTime() / 1000));
};
exports.createOrderKey = createOrderKey;
