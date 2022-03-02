import {
  SigningCosmWasmClient,
  UploadResult,
  InstantiateResult
} from 'secretjs'

import { CosmWasmSigningClient } from '../signing_cosmwasm_client/signing_cosmwasm_client.index'
import {
  uploadRecipientContractWasmFile,
  instantantiateContract
} from '../utils/scrt_client_tools.index'
import { INITMSGTYPE } from '../utils/types/utils.types.index'

/***
 * 
 * Upload Wasm File before set label and initMsg.
 * 1. Unique label
 * 2. initMsg
 * 
 * */ 

const deployLabel: string = 'My scrt app'; // unique label name for deploy contract

const initMsg: INITMSGTYPE = {
  name: 'sample-snip721',     // name of token contract
  symbol: 'SS7',              // name of token contract symbol
  entropy: 'sample',          // entropy used for prng seed
  config: {
      public_owner: true,     // optional privacy configuration for the contract
  },
};

export class UploadWasm {
  public inputWasmFileElements: HTMLInputElement;
  public displayContractAddressElement: HTMLElement;
  private reader: FileReader;
  private cosmWasmSigningClient: CosmWasmSigningClient;
  private signingClient: SigningCosmWasmClient | undefined;
  private label: string;
  private initMsg: INITMSGTYPE;
  private contractAddress: string;

  constructor() {
    this.inputWasmFileElements = <HTMLInputElement>document.getElementById('wasm_file');
    this.displayContractAddressElement = <HTMLElement>document.getElementById('contract_address');
    this.reader = new FileReader();
    this.cosmWasmSigningClient = new CosmWasmSigningClient();
    this.signingClient = undefined;
    this.label = UploadWasm.generateContractLabel(deployLabel);
    this.initMsg = initMsg;
    this.contractAddress = '';
  }

  private static generateContractLabel(deployLabel: string): string {
    return `${deployLabel}${Math.ceil(Math.random() * 10000)}`
  }

  private async uploadRecipientAndInstantantiateContract(
    client: SigningCosmWasmClient,
    wasm: Buffer | any,
  ): Promise<string> {
    try {
      const uploadRecipt: UploadResult = await uploadRecipientContractWasmFile(client, wasm);
      const { codeId } = uploadRecipt;
      
      const contract: InstantiateResult = await instantantiateContract(client, codeId, this.initMsg, this.label);
      const { contractAddress } = contract;

      return contractAddress
    } catch (error) {
      throw new Error(`Could not Deploy Contract :${error}`);
    }
  }

  private async fetchContractAddress(
    client: SigningCosmWasmClient,
    wasm: Buffer | any,
  ): Promise<void> {
    const contractAddress = await this.uploadRecipientAndInstantantiateContract(client, wasm);

    if (contractAddress) {
      this.contractAddress = contractAddress;

      this.displayContractAddress();
    }
  }

  // Initial
  public async init(): Promise<void> {
    try {
      await this.cosmWasmSigningClient.init();

      
      this.reader.addEventListener("load", event => {
        this.signingClient = this.cosmWasmSigningClient.getSigningClient();
        
        // Refactor
        if (event.target && this.signingClient !== undefined) {
          const wasm = event.target.result;
  
          this.fetchContractAddress(this.signingClient, wasm);
        }
      })
    } catch (error) {
      throw new Error(`Could not Init :${error}`);
    }
  }

  // file reader
  public readWasmFile(input: HTMLInputElement) {
    if (input.files !== null) {
      this.reader.readAsArrayBuffer(input.files[0]);
    } else {
      throw new Error('Could not found file');
    }
  }

  // display contract address
  public displayContractAddress() {
    const errorMessage: string = 'Could not found contract address: Please select Wasm File.';

    this.displayContractAddressElement.textContent = !this.contractAddress ? errorMessage : this.contractAddress;
  }
}