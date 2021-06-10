/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { EnterpriseStorage } from "../EnterpriseStorage";

export class EnterpriseStorage__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EnterpriseStorage {
    return new Contract(address, _abi, signerOrProvider) as EnterpriseStorage;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "disablePaymentToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "enablePaymentToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAvailableReserve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBondingCurve",
    outputs: [
      {
        internalType: "uint256",
        name: "pole",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slope",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBorrowToken",
    outputs: [
      {
        internalType: "contract IBorrowToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBorrowerLoanReturnGracePeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConverter",
    outputs: [
      {
        internalType: "contract IConverter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEnterpriseCollector",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEnterpriseLoanCollectGracePeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEnterpriseVault",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGCFeePercent",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInfo",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "baseUri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalShares",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "interestGapHalvingPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "borrowerLoanReturnGracePeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "enterpriseLoanCollectGracePeriod",
        type: "uint32",
      },
      {
        internalType: "uint16",
        name: "gcFeePercent",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "fixedReserve",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "usedReserve",
        type: "uint256",
      },
      {
        internalType: "uint112",
        name: "streamingReserve",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "streamingReserveTarget",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "streamingReserveUpdated",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInterestGapHalvingPeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInterestToken",
    outputs: [
      {
        internalType: "contract IInterestToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getLiquidityInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "shares",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "block",
            type: "uint256",
          },
        ],
        internalType: "struct EnterpriseStorage.LiquidityInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLiquidityToken",
    outputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getLoanInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint112",
            name: "amount",
            type: "uint112",
          },
          {
            internalType: "uint16",
            name: "powerTokenIndex",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "borrowingTime",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maturityTime",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "borrowerReturnGraceTime",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "enterpriseCollectGraceTime",
            type: "uint32",
          },
          {
            internalType: "uint112",
            name: "gcFee",
            type: "uint112",
          },
          {
            internalType: "uint16",
            name: "gcFeeTokenIndex",
            type: "uint16",
          },
        ],
        internalType: "struct EnterpriseStorage.LoanInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPowerTokens",
    outputs: [
      {
        internalType: "contract PowerToken[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProxyAdmin",
    outputs: [
      {
        internalType: "contract ProxyAdmin",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUsedReserve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "enterpriseName",
        type: "string",
      },
      {
        internalType: "string",
        name: "baseUri",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "gcFeePercent",
        type: "uint16",
      },
      {
        internalType: "contract IConverter",
        name: "converter",
        type: "address",
      },
      {
        internalType: "contract ProxyAdmin",
        name: "proxyAdmin",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "liquidityToken",
        type: "address",
      },
      {
        internalType: "contract IInterestToken",
        name: "interestToken",
        type: "address",
      },
      {
        internalType: "contract IBorrowToken",
        name: "borrowToken",
        type: "address",
      },
    ],
    name: "initializeTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract PowerToken",
        name: "powerToken",
        type: "address",
      },
    ],
    name: "isRegisteredPowerToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "isSupportedPaymentToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "paymentToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "paymentTokenIndex",
    outputs: [
      {
        internalType: "int16",
        name: "",
        type: "int16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "baseUri",
        type: "string",
      },
    ],
    name: "setBaseUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pole",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slope",
        type: "uint256",
      },
    ],
    name: "setBondingCurve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "newPeriod",
        type: "uint32",
      },
    ],
    name: "setBorrowerLoanReturnGracePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IConverter",
        name: "newConverter",
        type: "address",
      },
    ],
    name: "setConverter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newCollector",
        type: "address",
      },
    ],
    name: "setEnterpriseCollector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "newPeriod",
        type: "uint32",
      },
    ],
    name: "setEnterpriseLoanCollectGracePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newVault",
        type: "address",
      },
    ],
    name: "setEnterpriseVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "newGcFeePercent",
        type: "uint16",
      },
    ],
    name: "setGcFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "interestGapHalvingPeriod",
        type: "uint32",
      },
    ],
    name: "setInterestGapHalvingPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "upgradeBorrowToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "upgradeEnterprise",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "upgradeInterestToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract PowerToken",
        name: "powerToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "upgradePowerToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];