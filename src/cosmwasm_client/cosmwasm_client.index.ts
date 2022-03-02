import {
    Secp256k1Pen,
} from 'secretjs'

import { PubKey } from 'secretjs/types/types';

import {
  mnemonic,
  generateSigningPen,
  generatePubkey,
  generateWalletAccAddress,
} from '../utils/scrt_tools.index'

export class CosmWasmClient {
    mnemonic: string;
    signingPen: Secp256k1Pen | undefined;
    pubkey: PubKey | undefined;
    accAddress: string;

    constructor() {
        this.mnemonic = mnemonic;     // generate mnemonic
        this.signingPen = undefined;
        this.pubkey = undefined;
        this.accAddress = '';
    }

    public async init(): Promise<void> {
        try {
            this.signingPen = await generateSigningPen(mnemonic);
            this.pubkey = await generatePubkey(this.signingPen);
            this.accAddress = await generateWalletAccAddress(this.pubkey);
        } catch (error) {
            throw new Error(`Could not found cosmwasm client: ${error}`);
        }
    }

    public getMnemonic(): string {
        return this.mnemonic
    }

    public getAccAddress(): string {
        return this.accAddress
    }
}