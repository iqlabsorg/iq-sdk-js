import { deployments, ethers } from 'hardhat';
import { AccountId, ChainId } from 'caip';
import { Multiverse, MetahubAdapter } from '../src';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

/**
 * @group unit
 */
describe('Metahub Adapter', () => {
  let chainId: ChainId;
  let deployer: SignerWithAddress;
  let multiverse: Multiverse;
  let metahub: MetahubAdapter;

  beforeAll(async () => {
    await deployments.fixture();
    deployer = await ethers.getNamedSigner('deployer');

    chainId = new ChainId({
      namespace: 'eip155',
      reference: String(await deployer.getChainId()),
    });

    multiverse = await Multiverse.init({ signer: deployer });

    const metahubContract = await ethers.getContract('Metahub');
    metahub = multiverse.metahub(new AccountId({ chainId, address: metahubContract.address }));
  }, 20000);

  it('returns correct chain ID', async () => {
    await expect(metahub.getChainId()).resolves.toEqual(chainId);
  });
});
