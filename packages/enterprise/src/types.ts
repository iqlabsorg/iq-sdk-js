import type {
  AccountState as OnChainAccountState,
  EnterpriseInfo as OnChainEnterpriseInfo,
  ServiceInfo as OnChainServiceInfo,
} from '@iqprotocol/abstract-blockchain';
import { BigNumberish } from '@iqprotocol/abstract-blockchain';
import { AccountId } from 'caip';

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
