"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const vendor_1 = __importDefault(require("../abstracts/vendor"));
const contracts_1 = require("@ethersproject/contracts");
const ethers_1 = require("ethers");
const constants_1 = require("../constants");
class default_1 extends vendor_1.default {
    constructor(p, s) {
        super();
        this.provider = p;
        this.signer = s;
    }
    setSigner(p) {
        const provider = new ethers_1.ethers.providers.Web3Provider(p);
        this.signer = provider.getSigner();
    }
    contract(address, abi) {
        this.requireSignerOrProvider();
        return new contracts_1.Contract(address, abi, this.signer);
    }
    prepareOrder(o) {
        return {
            key: ethers_1.utils.arrayify(o.key),
            maker: o.maker,
            underlying: o.underlying,
            floating: o.floating,
            principal: ethers_1.ethers.BigNumber.from(o.principal),
            interest: ethers_1.ethers.BigNumber.from(o.interest),
            duration: ethers_1.ethers.BigNumber.from(o.duration),
            expiry: ethers_1.ethers.BigNumber.from(o.expiry),
        };
    }
    signOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.signer._signTypedData(constants_1.DOMAIN, constants_1.TYPES, o);
        });
    }
    splitSignature(s) {
        const splitSig = ethers_1.utils.splitSignature(s);
        const components = {
            v: splitSig.v,
            r: splitSig.r,
            s: splitSig.s,
        };
        components.v = parseInt(components.v + '');
        if (components.v < 27)
            components.v += 27;
        return components;
    }
    prepareFillingAmount(a) {
        return ethers_1.ethers.BigNumber.from(a);
    }
    requireSignerOrProvider() {
        if (!this.signer && !this.provider)
            throw new ReferenceError(errors_1.SIGNER_OR_PROVIDER_REQUIRED);
    }
}
exports.default = default_1;
