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
const deployed_1 = __importDefault(require("./abstracts/deployed"));
class default_1 extends deployed_1.default {
    constructor(v) {
        super(v, constants_1.SWIVEL_ABI);
    }
    signOrder(o, p) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendor.signOrder(o, p);
        });
    }
    fillFixed(o, a, k, s) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const order = this.vendor.prepareOrder(o);
            const components = this.vendor.splitSignature(s);
            const filling = this.vendor.prepareFillingAmount(a);
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.fillFixed(order, filling, k, components));
        });
    }
    fillFloating(o, a, k, s) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const order = this.vendor.prepareOrder(o);
            const components = this.vendor.splitSignature(s);
            const filling = this.vendor.prepareFillingAmount(a);
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.fillFloating(order, filling, k, components));
        });
    }
    releaseFixed(o, a) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.releaseFixed(o, a));
        });
    }
    releaseFloating(o, a) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.releaseFloating(o, a));
        });
    }
    batchFillFixed(o, a, k, s) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const orders = o.map((r) => this.vendor.prepareOrder(r));
            const components = s.map((sig) => this.vendor.splitSignature(sig));
            const fillings = [];
            for (let i = 0; i < a.length; i++) {
                const filling = this.vendor.prepareFillingAmount(a[i]);
                fillings.push(filling);
            }
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.batchFillFixed(orders, fillings, k, components));
        });
    }
    batchFillFloating(o, a, k, s) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const orders = o.map((r) => this.vendor.prepareOrder(r));
            const components = s.map((sig) => this.vendor.splitSignature(sig));
            const fillings = [];
            for (let i = 0; i < a.length; i++) {
                const filling = this.vendor.prepareFillingAmount(a[i]);
                fillings.push(filling);
            }
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.batchFillFloating(orders, fillings, k, components));
        });
    }
    batchRelease(o, a) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.batchRelease(o, a));
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
