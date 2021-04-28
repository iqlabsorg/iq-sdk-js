import { EnterpriseFactory } from '../../types/contracts';
import hre from 'hardhat';
import { Contract } from 'ethers';

export const getEnterprise = async (
  enterpriseFactory: EnterpriseFactory,
  deploymentBlockNumber: number,
): Promise<Contract> => {
  const events = await enterpriseFactory.queryFilter(
    enterpriseFactory.filters.EnterpriseDeployed(null, null, null, null),
    deploymentBlockNumber,
  );

  const enterpriseAddress = events[0].args?.[3];
  return (await hre.ethers.getContractFactory('Enterprise')).attach(
    enterpriseAddress,
  );
};
