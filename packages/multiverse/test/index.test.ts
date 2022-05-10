import { ethers } from 'hardhat';
import { ChainId } from 'caip';
import { SignerWithAddress } from 'hardhat-deploy-ethers/signers';
import { Multiverse } from '../src';

/**
 * @group unit
 */
describe('@iqprotocol/multiverse', () => {
  let chainId: ChainId;
  let deployer: SignerWithAddress;
  let multiverse: Multiverse;

  beforeAll(async () => {
    //await deployments.fixture();
    deployer = await ethers.getNamedSigner('deployer');

    chainId = new ChainId({
      namespace: 'eip155',
      reference: String(await deployer.getChainId()),
    });

    multiverse = await Multiverse.init({ signer: deployer });
  });

  test.todo('some test to be written in the future');

  it('returns correct chain ID', async () => {
    await expect(multiverse.getChainId()).resolves.toEqual(chainId);
  });
});
