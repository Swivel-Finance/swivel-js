"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(v, a) {
        this.vendor = v;
        this.abi = a;
    }
    at(a, o) {
        this.contract = this.vendor.contract(a, this.abi, o);
        return !!this.contract;
    }
}
exports.default = default_1;
