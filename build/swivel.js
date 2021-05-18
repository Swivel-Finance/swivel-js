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
const constants_1 = require("./constants");
const errors_1 = require("./errors");
const deployed_1 = __importDefault(require("./abstracts/deployed"));
class default_1 extends deployed_1.default {
    constructor(vendor, i, verifier) {
        super(vendor, constants_1.SWIVEL_ABI);
        this.chainId = i;
        this.verifyingContract = verifier;
    }
    signOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.chainId || !this.verifyingContract)
                return Promise.reject(errors_1.CHAIN_ID_AND_VERIFYING_CONTRACT_REQUIRED);
            return yield this.vendor.signOrder(o, this.chainId, this.verifyingContract);
        });
    }
    cancel(o, s) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const order = this.vendor.prepareOrder(o);
            const components = this.vendor.splitSignature(s);
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.cancel(order, components));
        });
    }
}
exports.default = default_1;
