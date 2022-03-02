import {
  Secp256k1Pen,
  encodeSecp256k1Pubkey,
  pubkeyToAddress,
  EnigmaUtils,
} from 'secretjs'
import { PubKey } from 'secretjs/types/types';
import { Bip39, Random } from '@iov/crypto';
import { ENVTYPES } from './types/utils.types.index'
import * as dotEnv from 'dotenv';
dotEnv.config();

/**
 * ########################
 *  Scrt method(tools)
 * ########################
 * 
 * 1. Secret key
 * 2. Rest RPC URL (TESTNET)
 * 3. Mnemonic
 * 4. SigningPen
 * 5. Public Key
 * 6. accAddress (Wallet address)
 * 7. EnigmaUtils
 * 
 * */ 

// helper method for read .env file 
export const setEnvValueHelper = (envValue: ENVTYPES): string => {
  return typeof envValue === 'string' ? envValue : 'Could not get value';
}

// Secret Key from read .env file
const scrtKey = setEnvValueHelper(process.env.SECRET_PREFIX_KEY);

// Rest RPC URL from read .env file
export const rpcUrl = setEnvValueHelper(process.env.SECRET_REST_URL);

// Generate Mnemonic
export const mnemonic: string = Bip39.encode(Random.getBytes(16)).toString();

// Generate SigningPen
export const generateSigningPen = async (mnemonic: string): Promise<Secp256k1Pen> => {
  try {
    return await Secp256k1Pen.fromMnemonic(mnemonic);
  } catch (error) {
    throw new Error(`Could not get signing pen : ${error}`);
  }
}

// Generate Public Key
export const generatePubkey = async (signinPen: Secp256k1Pen): Promise<PubKey> => {
  try {
    return encodeSecp256k1Pubkey(signinPen.pubkey);
  } catch (error) {
    throw new Error(`Could not get public key : ${error}`);
  }
}

// Generate accAddress (Wallet address)
export const generateWalletAccAddress = async (pubkey: PubKey): Promise<string> => {
  try {
    return pubkeyToAddress(pubkey, scrtKey);
  } catch (error) {
    throw new Error(`Could not get wallet address : ${error}`);
  }
}

// accAddress from read .env file
export const accAddressForTestnet = setEnvValueHelper(process.env.SECRET_TESTNET_ACCADDRESS);

// Generate EnigmaUtils
export const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
