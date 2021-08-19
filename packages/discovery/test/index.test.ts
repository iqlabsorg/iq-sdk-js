/**
 * @group unit
 */
import { chains } from '../src/chains';
import { deployments } from '../src/deployments';
import { getBlockchainInfo, getContractAddress, getContractAddresses } from '@iqprotocol/discovery';
import { ChainId } from 'caip';
import { IQContractName } from '../src/types';

const DEPLOYED_CHAINS = ['eip155:56', 'eip155:97'];

describe('Discovery Utils', () => {
  test('all deployments have corresponding chain record', () => {
    expect(Object.keys(deployments)).toEqual(Object.keys(deployments));
  });

  test('known deployments described', () => {
    expect(Object.keys(deployments)).toEqual(DEPLOYED_CHAINS);
  });

  test('known chains described', () => {
    expect(Object.keys(chains)).toEqual(DEPLOYED_CHAINS);
  });

  describe('Blockchain info', () => {
    it('returns info for known chain', () => {
      expect(getBlockchainInfo(new ChainId('eip155:xx'))).toBeNull();
      DEPLOYED_CHAINS.forEach(chainId => {
        expect(getBlockchainInfo(new ChainId(chainId))).toEqual(chains[chainId]);
      });
    });
  });

  describe('Deployed Contracts', () => {
    test('no accidental duplicates in contract addresses', () => {
      DEPLOYED_CHAINS.forEach(chainId => {
        const addresses = Object.values(deployments[chainId]);
        expect(new Set(addresses).size !== addresses.length).toBeFalsy();
      });
    });

    it('returns the list for contract addresses for known chain', () => {
      expect(getContractAddresses(new ChainId('eip155:xx'))).toBeNull();
      DEPLOYED_CHAINS.forEach(chainId => {
        expect(getContractAddresses(new ChainId(chainId))).toEqual(deployments[chainId]);
      });
    });

    it('returns contract address for known chain by contract name', () => {
      DEPLOYED_CHAINS.forEach(chainId => {
        Object.values(IQContractName).forEach(contractName => {
          expect(getContractAddress(new ChainId(chainId), contractName)).toEqual(deployments[chainId][contractName]);
        });
      });
    });
  });
});
