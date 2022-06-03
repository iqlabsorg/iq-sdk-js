import { AccountId, AssetId, AssetType, ChainId } from 'caip';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressTranslator } from '../src/address-translator';
import { AssetIdTranslator } from '../src/asset-id-translator';

/**
 * @group unit
 */
describe('Translators', () => {
  const chainId = new ChainId({ namespace: 'eip155', reference: '1' });
  const chainMismatchError = new Error(`Chain ID mismatch! Expected chain ID: ${chainId.toString()}`);

  describe('Address Translator', () => {
    let translator: AddressTranslator;

    beforeAll(() => {
      translator = new AddressTranslator(chainId);
    });

    it('translates plain address to account ID', () => {
      const address = '0x6A1f07F09952851fB0AEF2b37e502347688Ea074';
      expect(translator.addressToAccountId(address)).toEqual(new AccountId({ chainId, address }));
    });

    it('translates account ID to plain address', () => {
      const address = '0xCd64963Eb20Bf46F0fe6dd3EbdA1142d69bc6f3f';
      const accountId = new AccountId({ chainId, address });
      expect(translator.accountIdToAddress(accountId)).toEqual(address);
    });

    it('translates optional account ID to plain address', () => {
      const address = '0xCd64963Eb20Bf46F0fe6dd3EbdA1142d69bc6f3f';
      const accountId = new AccountId({ chainId, address });
      expect(translator.optionalAccountIdToAddress(accountId)).toEqual(address);
      expect(translator.optionalAccountIdToAddress()).toBeUndefined();
    });

    it('throws error on chain ID mismatch', () => {
      const address = '0xCd64963Eb20Bf46F0fe6dd3EbdA1142d69bc6f3f';
      const accountId = new AccountId({ chainId: 'eip155:2', address });
      expect(() => translator.accountIdToAddress(accountId)).toThrowError(chainMismatchError);
      expect(() => translator.optionalAccountIdToAddress(accountId)).toThrowError(chainMismatchError);
    });
  });

  describe('Asset ID Translator', () => {
    let translator: AssetIdTranslator;
    const tokenId = '123';
    const namespace = 'erc721';
    const reference = '0x6A1f07F09952851fB0AEF2b37e502347688Ea074';
    const assetName = { namespace: 'erc721', reference };
    const assetType = new AssetType({ chainId, assetName });
    const assetId = new AssetId({ ...assetType.toJSON(), tokenId });
    const assetMismatchError = new Error(`Asset mismatch! Expected asset: ${assetType.assetName.toString()}`);

    beforeAll(() => {
      translator = new AssetIdTranslator(assetType);
    });

    it('translates asset ID to token ID', () => {
      expect(translator.assetIdToTokenId(assetId)).toEqual(tokenId);
    });

    it('throws error on chain ID mismatch', () => {
      const incorrectAssetId = new AssetId({ chainId: { namespace: 'eip155', reference: '2' }, assetName, tokenId });
      expect(() => translator.assetIdToTokenId(incorrectAssetId)).toThrowError(chainMismatchError);
    });

    it('throws error on asset name mismatch', () => {
      expect(() =>
        translator.assetIdToTokenId(new AssetId({ assetName: { namespace: 'bep721', reference }, chainId, tokenId })),
      ).toThrowError(assetMismatchError);
      expect(() =>
        translator.assetIdToTokenId(new AssetId({ assetName: { namespace, reference: '0x1' }, chainId, tokenId })),
      ).toThrowError(assetMismatchError);
    });

    it('translates tokenId to assetId', () => {
      expect(translator.tokenIdToAssetId(BigNumber.from(tokenId))).toEqual(assetId);
    });
  });
});
