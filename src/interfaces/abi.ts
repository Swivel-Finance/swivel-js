export interface AbiInput {
    readonly name: string;
    readonly type: string;
    readonly internalType?: string;
    readonly components?: Readonly<AbiInput[]>;
}

export interface AbiConstructor {
    readonly type: 'constructor';
    readonly inputs: Readonly<AbiInput[]>;
    readonly stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
}

export interface AbiFunction {
    readonly type: 'function' | 'receive' | 'fallback';
    readonly name: string;
    readonly inputs: Readonly<AbiInput[]>;
    readonly outputs: Readonly<AbiInput[]>;
    readonly stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
}

export interface AbiEvent {
    readonly type: 'event';
    readonly name: string;
    readonly inputs: Readonly<(AbiInput & { indexed: boolean; })[]>;
    readonly anonymous: boolean;
}

export interface AbiError {
    readonly type: 'error';
    readonly name: string;
    readonly inputs: Readonly<AbiInput[]>;
}

export type AbiItem = AbiConstructor | AbiFunction | AbiEvent | AbiError;

export type Abi = Readonly<AbiItem[]>;
