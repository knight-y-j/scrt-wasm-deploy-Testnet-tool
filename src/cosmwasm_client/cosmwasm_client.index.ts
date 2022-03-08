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
    private mnemonic: string;
    private signingPen: Secp256k1Pen | undefined;
    private pubkey: PubKey | undefined;
    private accAddress: string;

    constructor() {
        this.mnemonic = mnemonic;     // create new mnemonic
        this.signingPen = undefined;
        this.pubkey = undefined;
        this.accAddress = '';
    }

    // initial
    public async init(): Promise<void> {
        try {
            this.signingPen = await generateSigningPen(mnemonic);
            this.pubkey = await generatePubkey(this.signingPen);
            this.accAddress = await generateWalletAccAddress(this.pubkey);
        } catch (error) {
            throw new Error(`Could not found cosmwasm client: ${error}`);
        }
    }

    // Get mnemonic
    public getMnemonic(): string {
        return this.mnemonic
    }

    // Get accAddress(wallet address)
    public getAccAddress(): string {
        return this.accAddress
    }
}