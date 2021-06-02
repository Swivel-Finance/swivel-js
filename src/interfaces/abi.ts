export interface ABIInput {
    readonly name: string;
    readonly type: string;
    readonly components?: Readonly<ABIInput[]>;
}

export interface ABIConstructor {
    readonly type: 'constructor';
    readonly inputs: Readonly<ABIInput[]>;
    readonly stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
}

export interface ABIFunction {
    readonly type: 'function' | 'receive' | 'fallback';
    readonly name: string;
    readonly inputs: Readonly<ABIInput[]>;
    readonly outputs: Readonly<ABIInput[]>;
    readonly stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
}

export interface ABIEvent {
    readonly type: 'event';
    readonly name: string;
    readonly inputs: Readonly<(ABIInput & { indexed: boolean; })[]>;
    readonly anonymous: boolean;
}

export interface ABIError {
    readonly type: 'error';
    readonly name: string;
    readonly inputs: Readonly<ABIInput[]>;
}

export type ABIItem = ABIConstructor | ABIFunction | ABIEvent | ABIError;

export type ABI = Readonly<ABIItem[]>;
