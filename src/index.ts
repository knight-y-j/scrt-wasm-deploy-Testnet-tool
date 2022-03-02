import { UploadWasm } from './upload_wasm/upload_wasm.index'

const uploadWasmToTestNet = new UploadWasm();

const runUploadWasm = async ():Promise<void> => {
  uploadWasmToTestNet.init();
  uploadWasmToTestNet.displayContractAddress(); // index.html id="contract_address"
}
runUploadWasm();

uploadWasmToTestNet.inputWasmFileElements.addEventListener('change', (event) => {
  event.preventDefault();

  const wasmFile = <HTMLInputElement>event.target; // index.html id="wasm_file"

  uploadWasmToTestNet.readWasmFile(wasmFile)
});
