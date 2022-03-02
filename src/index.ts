import { UploadWasm } from './upload_wasm/upload_wasm.index'
import { CosmWasmClient } from './cosmwasm_client/cosmwasm_client.index'

class App {
  private uploadWasmToTestNet: UploadWasm;
  private cosmWasmClient: CosmWasmClient;
  private cosmWasmButtonElement: HTMLButtonElement;
  private mnemonicInputElement: HTMLInputElement;
  private accAddressInputElement: HTMLInputElement;

  constructor() {
    this.uploadWasmToTestNet = new UploadWasm();
    this.cosmWasmClient = new CosmWasmClient();
    this.cosmWasmButtonElement = <HTMLButtonElement>document.getElementById('cosmwasm_client');
    this.mnemonicInputElement = <HTMLInputElement>document.getElementById("mnemonic_value");
    this.accAddressInputElement = <HTMLInputElement>document.getElementById("accAddress_value");
  }

  // Initial
  public init() {
    this.uploadWasmToTestNet.init();
    this.uploadWasmToTestNet.displayContractAddress(); // index.html id="contract_address"
    this.cosmWasmClient.init();
  }

  // Upload wasm file to The TESTNET.
  public runUploadWasmToTestNet() {
    this.uploadWasmToTestNet.inputWasmFileElements.addEventListener('change', (event) => {
      event.preventDefault();
    
      const wasmFile = <HTMLInputElement>event.target; // index.html id="wasm_file"
    
      this.uploadWasmToTestNet.readWasmFile(wasmFile);
    });
  }

  // Display generate mnemonic and wallet address(accAddress).
  public displayMnemonicAndAccAddress() {
    this.cosmWasmButtonElement.addEventListener('click', (event) => {
      event.preventDefault();
    
      const mnemonic = this.cosmWasmClient.getMnemonic();
      const accAddress = this.cosmWasmClient.getAccAddress();
    
      this.mnemonicInputElement.textContent = `mnemonic: ${mnemonic}`;
      this.accAddressInputElement.textContent = `accAddress: ${accAddress}`;
    })
  }
}

const app = new App();

app.init();
app.displayMnemonicAndAccAddress();
app.runUploadWasmToTestNet();