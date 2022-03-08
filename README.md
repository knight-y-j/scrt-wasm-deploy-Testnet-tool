# scrt-wasm-deploy-Testnet-tool

Upload wasm file to the TESTNET app.

app function

- deploy wasm file -> 'select wasm file'
- create a mnemonic and accAddress -> 'click'

tree

```
src
│   ├── cosmwasm_client
│   │   └── cosmwasm_client.index.ts
│   ├── index.ts
│   ├── signing_cosmwasm_client
│   │   └── signing_cosmwasm_client.index.ts
│   ├── upload_wasm
│   │   ├── contract.wasm
│   │   └── upload_wasm.index.ts
│   └── utils
│       ├── scrt_client_tools.index.ts // client method
│       ├── scrt_tools.index.ts        // tools
│       └── types
│           └── utils.types.index.ts
├── tsconfig.json
├── webpack.config.prod.ts
├── webpack.config.ts
└── yarn.lock
```

---

# Environment

- typescript
- Node.js
- webpack

# Wasm file(contract.wasm.gz)

```
gunzip contract.wasm.gz
```

-> app dir upload_wasm/contract.wasm

# Step

1. git clone this repository

```
git clone https://github.com/y-Knight/scrt-wasm-deploy-Testnet-tool.git
```

2. yarn install

```
yarn install
```

3. .env

```
cp -p .env.sample .env
```

```
SECRET_REST_URL=http://testnet.securesecrets.org:1317/ // to palsur-2
SECRET_PREFIX_KEY='secret'                             // key
SECRET_MNEMONIC=<MNEMONIC>                             // mnemonic
SECRET_TESTNET_ACCADDRESS=<accAddress>                 // accAddress
```

4. Upload Wasm File before set custom fee memo and initMsg

- src/signing_cosmwasm_client/signing_cosmwasm_client.index.ts -> custom fee
- src/utils/upload_wasm.index.ts -> memo and initMsg

5. faucet

Faucet: https://faucet.secrettestnet.io/ // Use this faucet to get tokens for the pulsar-2 testnet.

6. yarn start

```
yarn start
```

-> access http://localhost:8080

if you need create a mnemonic and accAddress

- Create 'Click'
- Go back to Step.3 : set .env file (SECRET_MNEMONIC and SECRET_TESTNET_ACCADDRESS)
- yarn start -> access http://localhost:8080

7. upload wasm file

- click 'select wasm file'
- choose contract.wasm -> display contract address after few second.
