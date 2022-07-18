/**
 * A read-only subset of the ERC-20 token ABI.
 */
export const ERC20_ABI = [
    'function name() public view returns (string)',
    'function symbol() public view returns (string)',
    'function decimals() public view returns (uint8)',
    'function totalSupply() public view returns (uint256)',
    'function balanceOf(address owner) public view returns (uint256)',
    'function allowance(address owner, address spender) public view returns (uint256)',
    'function approve(address spender, uint256 value) public returns (bool)',
];

/**
 * A read-only subset of the CERC-20 token ABI.
 */
export const CERC20_ABI = [
    ...ERC20_ABI,
    'function exchangeRateCurrent() public view returns (uint)',
    'function supplyRatePerBlock() external view returns (uint)',
];
