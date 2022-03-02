import {
  CosmWasmClient,
  GetNonceResult,
  SigningCosmWasmClient,
  UploadResult,
  InstantiateResult,
} from 'secretjs'

import {
  NodeInfoResponse,
  BlockResponse,
} from 'secretjs/types/restclient'

import { rpcUrl } from './scrt_tools.index'
import { CHAINIDTYPE, HEIGHTTYPE, ACCOUNTTYPE, INITMSGTYPE } from './types/utils.types.index'

/**
 * ################################
 *  CosmWasm Client tools(Method)
 * ################################
 * 
 * 1. Chain ID
 * 2. Height
 * 3. Account Address(wallet address)
 * 4. Nonce
 * 5. Node info
 * 6. Block
 * 7. Latest Block
 * 
 * */ 

// Create CosmWasm Client
export const client: CosmWasmClient = new CosmWasmClient(rpcUrl);

// Get Chain id
export const fetchChainId = async (): Promise<CHAINIDTYPE> => {
  try {
    return await client.getChainId();
  } catch(error) {
    throw new Error(`Could not get chain id: ${error}`);
  }
}

// Get Height
export const fetchHeight = async (): Promise<HEIGHTTYPE> => {
  try {
    return await client.getHeight();
  } catch (error) {
    throw new Error(`Could not get height id: ${error}`);
  }
}

// Get Account Address
export const fetchAccount = async (accAddress: string): Promise<ACCOUNTTYPE> => {
  try {
    return await client.getAccount(accAddress);
  } catch (error) {
    throw new Error(`Could not get account : ${error}`);
  }
}

// Get Nonce
export const fetchNonce = async (accAddress: string): Promise<GetNonceResult> => {
  try {
    return await client.getNonce(accAddress);
  } catch (error) {
    throw new Error(`Could not get nonce : ${error}`);
  }
}

// Get Node Info
export const fetchNodeInfo = async (): Promise<NodeInfoResponse> => {
  try {
    return await client.restClient.nodeInfo()
  } catch (error) {
    throw new Error(`Could not fetch node info: ${error}`);
  }
}

// Get Blocks
export const fetchBlocks = async (blockIndex: number): Promise<BlockResponse> => {
  try {
    return await client.restClient.blocks(blockIndex);
  } catch (error) {
    throw new Error(`Could not fetch block: ${error}`);
  }
}

// Get Latest Blocks
export const fetchBlockLatest = async (): Promise<BlockResponse> => {
  try {
    return await client.restClient.blocksLatest();
  } catch (error) {
    throw new Error(`Could not fetch latest block: ${error}`);
  }
}

/**
 * #######################################
 *  Singing CosmWasm Client tools(Method)
 * #######################################
 * 
 * 1. uploadRecipient(Deploy Contract)
 * 2. instantiate (Instantiate Contract)
 * 
 * */ 

// Upload wasm file to the TESTNET
export const uploadRecipientContractWasmFile = async (client: SigningCosmWasmClient, wasm: Buffer): Promise<UploadResult> => {
  try {
    return await client.upload(wasm, {});
  } catch (error) {
    throw new Error(`Could not upload contract: ${error}`);
  }
}

// Instantantiate Contract
export const instantantiateContract = async (
  client: SigningCosmWasmClient,
  codeId: number,
  initMsg: INITMSGTYPE,
  label: string,
): Promise<InstantiateResult> => {
  try {
    return await client.instantiate(
      codeId,
      initMsg,
      label,
    )
  } catch (error) {
    throw new Error(`Could not instantiate contract: ${error}`);
  }
}