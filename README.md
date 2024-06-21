# WalletConnect Solana Adapter - Core

## How to run this repo?

1. Install dependencies

```sh
pnpm install
```

2. Build!

```sh
pnpm run build:package
```

3. Run!

```sh
pnpm run dev:playground
```

## How to Test?

Most Mobile wallets don't support Testnet/Devnet. Either change the network to Mainnet or use our [sample wallet](https://react-wallet.walletconnect.com/).

## How to make a release?

1. Build the package

```sh
pnpm run build:package
```

2. Release

```sh
cd plackages/walletconnect-solana
npm publish --access public
```