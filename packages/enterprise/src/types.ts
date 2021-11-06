import { AccountId } from 'caip';
import { BigNumberish } from '@ethersproject/bignumber';
import {
  AccountState as OnChainAccountState,
  EnterpriseInfo as OnChainEnterpriseInfo,
  RentalAgreement as OnChainRentalAgreement,
  ServiceInfo as OnChainServiceInfo,
  Stake as OnChainStake,
} from '@iqprotocol/abstract-blockchain';

export type EnterpriseInfo = Omit<OnChainEnterpriseInfo, 'address'> & {
  accountId: AccountId;
};

export type ServiceInfo = Omit<OnChainServiceInfo, 'address' | 'baseToken'> & {
  accountId: AccountId;
  baseTokenAccountId: AccountId;
};

export type RentalFeeEstimationRequest = {
  serviceAccountId: AccountId;
  paymentTokenAccountId: AccountId;
  rentalAmount: BigNumberish;
  rentalPeriod: BigNumberish;
};

export type RentRequest = RentalFeeEstimationRequest & { maxPayment: BigNumberish };

export type AccountState = Omit<OnChainAccountState, 'serviceAddress' | 'accountAddress'> & {
  serviceId: AccountId;
  accountId: AccountId;
};

// export type Stake = Omit<OnChainStake, 'tokenId'> & {
//   tokenId: AssetId;
// };
export type Stake = OnChainStake;

export type RentalAgreement = OnChainRentalAgreement;
