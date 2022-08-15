/**
 * A subset of the ERC-20 token ABI.
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
