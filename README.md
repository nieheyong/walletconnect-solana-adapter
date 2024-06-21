# How to run this repo?

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

# How to make a release?

1. Build the package

```sh
pnpm run build:package
```

2. Release

```sh
cd plackages/walletconnect-solana
npm publish --access public
```