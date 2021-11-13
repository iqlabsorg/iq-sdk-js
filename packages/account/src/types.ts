import { AccountOwnershipProof } from '@iqprotocol/abstract-storage';

export type AccountRegistrationParams = {
  proof: AccountOwnershipProof;
};

export type MessageTypeProperty = {
  name: string;
  type: string;
};

export type MessageTypes = {
  [additionalProperties: string]: MessageTypeProperty[];
  EIP712Domain: MessageTypeProperty[];
};
