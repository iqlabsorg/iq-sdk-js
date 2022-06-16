import { Adapter } from '../adapter';
import { IAvailabilityPeriodMechanics__factory, IERC721Warper, IRentalPeriodMechanics__factory } from '../contracts';
import { ContractResolver } from '../contract-resolver';
import { AddressTranslator } from '../address-translator';
import { AssetType } from 'caip';
import { assetClasses } from '../constants';
import { WarperRentingConstraints } from '../types';

export class ERC721WarperAdapter extends Adapter {
  private readonly contract: IERC721Warper;

  constructor(assetType: AssetType, contractResolver: ContractResolver, addressTranslator: AddressTranslator) {
    super(contractResolver, addressTranslator);
    const { namespace } = assetType.assetName;
    if (namespace !== assetClasses.ERC721.namespace) {
      throw new Error(`Invalid asset type: "${namespace}"! Expected: "erc721"`);
    }
    this.contract = contractResolver.resolveERC721Warper(this.assetTypeToAddress(assetType));
  }

  /**
   * Returns warper renting constraints based on implemented mechanics.
   */
  async rentingConstraints(): Promise<WarperRentingConstraints> {
    const { address, signer } = this.contract;

    // Mapping from constraint key to mechanics interface ID and factory.
    const constraintMechanics = {
      availabilityPeriod: { interfaceId: '0x70c8db71', factory: IAvailabilityPeriodMechanics__factory },
      rentalPeriod: { interfaceId: '0x331f761f', factory: IRentalPeriodMechanics__factory },
    };

    // Get the list of mechanics implemented by the warpers.
    const constraints: WarperRentingConstraints = {};
    const warperMechanics = await this.contract.__supportedInterfaces([
      constraintMechanics.availabilityPeriod.interfaceId,
      constraintMechanics.rentalPeriod.interfaceId,
    ]);

    // Communicate with warper mechanics to populate constraints.
    if (warperMechanics[0]) {
      const m0 = constraintMechanics.availabilityPeriod.factory.connect(address, signer);
      const { availabilityPeriodStart, availabilityPeriodEnd } = await m0.__availabilityPeriodRange();
      constraints.availabilityPeriod = {
        start: availabilityPeriodStart,
        end: availabilityPeriodEnd,
      };
    }

    if (warperMechanics[1]) {
      const m1 = constraintMechanics.rentalPeriod.factory.connect(address, signer);
      const { minRentalPeriod, maxRentalPeriod } = await m1.__rentalPeriodRange();
      constraints.rentalPeriod = {
        min: minRentalPeriod,
        max: maxRentalPeriod,
      };
    }

    return constraints;
  }
}
