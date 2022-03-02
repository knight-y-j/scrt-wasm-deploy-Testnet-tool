# scrt-wasm-deploy-Testnet-tool

Upload wasm file to the TESTNET app.

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

4. faucet

Faucet: https://faucet.secrettestnet.io/ // Use this faucet to get tokens for the pulsar-2 testnet.

5. yarn start

```
yarn start
```

if you need create a mnemonic and accAddress

- Create 'Click'
- Go back to Step.3 : set .env file (SECRET_MNEMONIC and SECRET_TESTNET_ACCADDRESS)
- yarn start

6. upload wasm file

click 'select wasm file' -> choose contract.wasm -> display contract address after few second.
