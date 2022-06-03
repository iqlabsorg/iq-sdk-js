import { ethers } from 'hardhat';
import { ContractReceipt, ContractTransaction } from 'ethers';
import { Address, BlockchainProvider } from '@iqprotocol/abstract-blockchain';
import { BigNumberish } from '@ethersproject/bignumber';
import { Enterprise, EnterpriseFactory, PowerToken } from '../../src/contracts';

export const getEnterprise = async (
  enterpriseFactory: EnterpriseFactory,
  deploymentBlockNumber: number,
): Promise<Enterprise> => {
  const events = await enterpriseFactory.queryFilter(
    enterpriseFactory.filters.EnterpriseDeployed(null, null, null, null, null),
    deploymentBlockNumber,
  );
  const enterpriseAddress = events[0].args.deployed;
  return (await ethers.getContractFactory('Enterprise')).attach(enterpriseAddress) as Enterprise;
};

export const getPowerToken = async (enterprise: Enterprise, deploymentBlockNumber: number): Promise<PowerToken> => {
  const events = await enterprise.queryFilter(enterprise.filters.ServiceRegistered(null), deploymentBlockNumber);
  const powerTokenAddress = events[0].args.powerToken;
  return (await ethers.getContractFactory('PowerToken')).attach(powerTokenAddress) as PowerToken;
};

export const baseRate = (
  tokens: bigint,
  period: bigint,
  price: bigint,
  tokenDecimals = 18n,
  priceDecimals = 18n,
): bigint => {
  if (tokenDecimals > priceDecimals) {
    // eslint-disable-next-line prettier/prettier
    return (price * 10n ** (tokenDecimals - priceDecimals) << 64n) / (tokens * period);
  } else if (tokenDecimals < priceDecimals) {
    return (price << 64n) / (tokens * 10n ** (priceDecimals - tokenDecimals) * period);
  }
  return (price << 64n) / (tokens * period);
};

export const wait = async (txPromise: Promise<ContractTransaction>): Promise<ContractReceipt> =>
  (await txPromise).wait();

export const mineBlock = async (timestamp = 0): Promise<unknown> =>
  ethers.provider.send('evm_mine', timestamp > 0 ? [timestamp] : []);

export const latestBlockTimestamp = async (): Promise<number> => (await ethers.provider.getBlock('latest')).timestamp;

export const waitBlockchainTime = async (seconds: number): Promise<void> => {
  const time = await latestBlockTimestamp();
  await mineBlock(time + seconds);
};

export const estimateAndRent = async (
  provider: BlockchainProvider<ContractTransaction>,
  enterpriseAddress: Address,
  serviceAddress: Address,
  paymentTokenAddress: Address,
  rentalAmount: BigNumberish,
  rentalPeriod: BigNumberish,
): Promise<void> => {
  const estimate = await provider
    .enterprise(enterpriseAddress)
    .estimateRentalFee(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod);

  await wait(provider.enterprise(enterpriseAddress).setEnterpriseTokenAllowance(estimate));
  await wait(
    provider
      .enterprise(enterpriseAddress)
      .rent(serviceAddress, paymentTokenAddress, rentalAmount, rentalPeriod, estimate),
  );
};
