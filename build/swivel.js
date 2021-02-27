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
    signOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendor.signOrder(o);
        });
    }
    fillFixed(o, a, k) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const order = this.vendor.prepareOrder(o);
            const signature = yield this.vendor.signOrder(order);
            const components = this.vendor.splitSignature(signature);
            const { filling, agreementKey } = this.vendor.prepareOrderMeta(a, k);
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.fillFixed(order, filling, agreementKey, components));
        });
    }
    fillFloating(o, a, k) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const order = this.vendor.prepareOrder(o);
            const signature = yield this.vendor.signOrder(order);
            const components = this.vendor.splitSignature(signature);
            const { filling, agreementKey } = this.vendor.prepareOrderMeta(a, k);
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.fillFloating(order, filling, agreementKey, components));
        });
    }
    releaseFixed(o, a) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { orderKey, agreementKey } = this.vendor.prepareReleaseMeta(o, a);
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.releaseFixed(orderKey, agreementKey));
        });
    }
    releaseFloating(o, a) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { orderKey, agreementKey } = this.vendor.prepareReleaseMeta(o, a);
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.releaseFloating(orderKey, agreementKey));
        });
    }
    batchFillFixed(o, a, k) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const orders = o.map((r) => this.vendor.prepareOrder(r));
            const signature = yield Promise.all(orders.map((o) => this.vendor.signOrder(o)));
            const components = signature.map((s) => this.vendor.splitSignature(s));
            const fillings = [];
            const aggreementKeys = [];
            for (let i = 0; i < a.length; i++) {
                const { filling, agreementKey } = this.vendor.prepareOrderMeta(a[i], k[i]);
                fillings.push(filling);
                aggreementKeys.push(agreementKey);
            }
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.batchFillFixed(orders, fillings, aggreementKeys, components));
        });
    }
    batchFillFloating(o, a, k) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const orders = o.map((r) => this.vendor.prepareOrder(r));
            const signature = yield Promise.all(orders.map((o) => this.vendor.signOrder(o)));
            const components = signature.map((s) => this.vendor.splitSignature(s));
            const fillings = [];
            const aggreementKeys = [];
            for (let i = 0; i < a.length; i++) {
                const { filling, agreementKey } = this.vendor.prepareOrderMeta(a[i], k[i]);
                fillings.push(filling);
                aggreementKeys.push(agreementKey);
            }
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.batchFillFloating(orders, fillings, aggreementKeys, components));
        });
    }
    batchRelease(o, a) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const orderKeys = [];
            const aggreementKeys = [];
            for (let i = 0; i < o.length; i++) {
                const { orderKey, agreementKey } = this.vendor.prepareReleaseMeta(o[i], a[i]);
                orderKeys.push(orderKey);
                aggreementKeys.push(agreementKey);
            }
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.batchRelease(orderKeys, aggreementKeys));
        });
    }
    cancel(o) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const order = this.vendor.prepareOrder(o);
            const signature = yield this.vendor.signOrder(order);
            const components = this.vendor.splitSignature(signature);
            return yield ((_a = this.contract) === null || _a === void 0 ? void 0 : _a.functions.cancel(order, components));
        });
    }
}
exports.default = default_1;
