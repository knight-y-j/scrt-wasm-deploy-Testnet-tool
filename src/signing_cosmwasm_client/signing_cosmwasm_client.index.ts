import {
  SigningCosmWasmClient,
  Secp256k1Pen,
} from 'secretjs'

import { PubKey } from 'secretjs/types/types'

import {
  rpcUrl,
  setEnvValueHelper,
  generateSigningPen,
  generatePubkey,
  generateWalletAccAddress,
  txEncryptionSeed,
} from '../utils/scrt_tools.index'

import { CustomFeeTypes } from '../utils/types/utils.types.index'

import * as dotEnv from 'dotenv'
dotEnv.config()

/***
 * 
 * Upload Wasm File before set Custom fee.
 * 1. Custom fee
 * 
 * */ 

// Set Custom Fee
const customFees: CustomFeeTypes = {
  upload: {
    amount: [{ amount: "5000000", denom: "uscrt" }],
    gas: "5000000",
  },
  init: {
    amount: [{ amount: "500000", denom: "uscrt" }],
    gas: "500000",
  },
  exec: {
    amount: [{ amount: "500000", denom: "uscrt" }],
    gas: "500000",
  },
  send: {
    amount: [{ amount: "80000", denom: "uscrt" }],
    gas: "80000",
  },
};

export class CosmWasmSigningClient {
  private httpUrl: string;
  private mnemonic: string;
  private accAddress: string;
  private signingPenSign: Secp256k1Pen | undefined;
  private pubkeySign: PubKey | undefined;
  private txEncryptionSeed: Uint8Array;
  private customFees: CustomFeeTypes;
  private signingClient: SigningCosmWasmClient | undefined;

  constructor() {
    this.httpUrl = rpcUrl; // RPC_URL is to Pulsar-2
    this.mnemonic = setEnvValueHelper(process.env.SECRET_MNEMONIC)
    this.accAddress = '';
    this.signingPenSign = undefined;
    this.pubkeySign = undefined;
    this.txEncryptionSeed = txEncryptionSeed;
    this.customFees = customFees;
    this.signingClient = undefined;
  }

  // Generate Signing CosmWasm Client
  private static generateSigningCosmWasmClient(
    httpUrl: string,
    accAddress: string,
    signingPen: Secp256k1Pen,
    txEncryptionSeed: Uint8Array,
    customFees: CustomFeeTypes,
  ): SigningCosmWasmClient {
    return new SigningCosmWasmClient(
      httpUrl,
      accAddress,
      (signBytes) => signingPen.sign(signBytes),
      txEncryptionSeed,
      customFees,
    );
  }

  // Initial
  public async init(): Promise<void> {
    try {
      this.signingPenSign = await generateSigningPen(this.mnemonic);
      this.pubkeySign = await generatePubkey(this.signingPenSign);
      this.accAddress = await generateWalletAccAddress(this.pubkeySign);

      this.signingClient = CosmWasmSigningClient.generateSigningCosmWasmClient(
        this.httpUrl,
        this.accAddress,
        this.signingPenSign,
        this.txEncryptionSeed,
        this.customFees,
      );
    } catch (error) {
      throw new Error('Could not found signing client')
    }
  }

  // Get Signing Cosmwasm client
  public getSigningClient():SigningCosmWasmClient | undefined {
    return this.signingClient
  }
}