import { Enterprise, EnterpriseFactory, PowerToken } from '../../types/contracts';
import hre from 'hardhat';
import { ContractReceipt, ContractTransaction } from 'ethers';
import { Address, BlockchainProvider, BigNumberish } from '@iqprotocol/abstract-blockchain';

export const getEnterprise = async (
  enterpriseFactory: EnterpriseFactory,
  deploymentBlockNumber: number,
): Promise<Enterprise> => {
  const events = await enterpriseFactory.queryFilter(
    enterpriseFactory.filters.EnterpriseDeployed(null, null, null, null, null),
    deploymentBlockNumber,
  );
  const enterpriseAddress = events[0].args?.deployed;
  return (await hre.ethers.getContractFactory('Enterprise')).attach(enterpriseAddress) as Enterprise;
};

export const getPowerToken = async (enterprise: Enterprise, deploymentBlockNumber: number): Promise<PowerToken> => {
  const events = await enterprise.queryFilter(
    enterprise.filters.ServiceRegistered(null, null, null),
    deploymentBlockNumber,
  );
  const powerTokenAddress = events[0].args?.[0];
  return (await hre.ethers.getContractFactory('PowerToken')).attach(powerTokenAddress) as PowerToken;
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
  hre.ethers.provider.send('evm_mine', timestamp > 0 ? [timestamp] : []);

export const latestBlockTimestamp = async (): Promise<number> =>
  (await hre.ethers.provider.getBlock('latest')).timestamp;

export const waitBlockchainTime = async (seconds: number): Promise<void> => {
  const time = await latestBlockTimestamp();
  await mineBlock(time + seconds);
};

export const estimateAndBorrow = async (
  provider: BlockchainProvider<ContractTransaction>,
  enterpriseAddress: Address,
  serviceAddress: Address,
  paymentTokenAddress: Address,
  loanAmount: BigNumberish,
  duration: BigNumberish,
): Promise<void> => {
  const estimate = await provider.estimateLoan(
    enterpriseAddress,
    serviceAddress,
    paymentTokenAddress,
    loanAmount,
    duration,
  );

  await wait(provider.setLiquidityAllowance(enterpriseAddress, estimate));
  await wait(provider.borrow(enterpriseAddress, serviceAddress, paymentTokenAddress, loanAmount, duration, estimate));
};
