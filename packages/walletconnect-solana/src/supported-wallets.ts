// Some recommended wallet IDs. This gets shuffled upon display to user, however, any wallet _not_ on this list will not get surfaced at all.
// Comes from wallet IDs on https://walletconnect.com/explorer?type=wallet&chains=solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ,
// with a preference for wallets that support both mainnet-beta and devnet, then mainnet only.
// Not all wallets here support the "QR Code" version of the WC protocol, but can still operate as an injected provider via the extension.
// This list of wallets is not maintained, and wallets are responsible for adding or removing themselves from this list.

export const devnetMainnetWalletIds = [
    '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489', // Fireblocks
    '8ff6eccefefa7506339201bc33346f92a43118d6ff7d6e71d499d8187a1c56a2', // Broearn Wallet
    '8821748c25de9dbc4f72a691b25a6ddad9d7df12fa23333fd9c8b5fdc14cc819', // Burrito Wallet
    '835dc63f69f65113220e700112363fef2a5f1d72d6c0eef4f2c7dc66bf64b955', // CVL Wallet
    'ed657064daf740734d4a4ae31406cb294a17dc2dbd422ce90a86ed9816f0ded4', // Nitrogen Wallet
    '163d2cf19babf05eb8962e9748f9ebe613ed52ebf9c8107c9a0f104bfcf161b3', // Brave Wallet
    '3fecad5e2f0a30aba97edea69ebf015884a9b8a9aec93e66d4b4b695fee1f010', // Torus
    '6d1d5b892e02d4c992ae67f18f522398481360c64269f5cdf5e4b80435b20e3d', // 3S Wallet
    '1aedbcfc1f31aade56ca34c38b0a1607b41cccfa3de93c946ef3b4ba2dfab11c', // OneKey
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393', // Phantom
];

export const mainnetWalletIds = [
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    '74f8092562bd79675e276d8b2062a83601a4106d30202f2d509195e30e19673d', // Spot
    'afbd95522f4041c71dd4f1a065f971fd32372865b416f95a0b1db759ae33f2a7', // Omni
    '85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041', // Frontier
    '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150', // SafePal
    'e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4', // Exodus
    'dceb063851b1833cbb209e3717a0a0b06bf3fb500fe9db8cd3a553e4b1d02137', // ONTO
    '7674bb4e353bf52886768a3ddc2a4562ce2f4191c80831291218ebd90f5f5e26', // MathWallet
    '802a2041afdaf4c7e41a2903e98df333c8835897532699ad370f829390c6900f', // Infinity Wallet
    '2a3c89040ac3b723a1972a33a125b1db11e258a6975d3a61252cd64e6ea5ea01', // Coin98 Super App
    '8059e5b1f76701e121e258cf86eec9bbace9428eabec5bde8efec565c63fba90', // Ottr Finance
    '4b2604c8e0f5022d0fbfbc67685dd5e87426bbfe514eebcce6c5f3638f2e1d81', // BC Vault
    'bfa6967fd05add7bb2b19a442ac37cedb6a6b854483729194f5d7185272c5594', // Absolute Wallet
    '87eecbca66faef32f044fc7c66090fc668efb02e2d17dda7bf095d51dff76659', // Crossmint
    '797c615e2c556b610c048eb35535f212c0dd58de5d03e763120e90a7d1350a77', // iToken Wallet
    'b823fb0d7228ef8e3c0bc9607df9ed79dae2ab3a2811d33f22ade4f573c18232', // Slavi
    '6534bbb4ccab1db9ed84ae4069b7c9577dd0b3ea211d4fdec2ef4f9ce186f38a', // StrikeX
    'dc5415b6ea8114db518ae91195b027d690a11a1d2bfdd1a904e93c5cb746380e', // SimpleHold
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase Wallet
    'f896cbca30cd6dc414712d3d6fcc2f8f7d35d5bd30e3b1fc5d60cf6c8926f98f', // XDEFI Wallet
    'a0e04f1086aac204d4ebdd5f985c12ed226cd0006323fd8143715f9324da58d1', // SafeMoon
    '0769b03b40fa93ff2cca28cf68582b3554cf10e3f4608e6c81b3089b2a3fcf01', // PassPay Wallet
    'e053718e3e968b085a0ae5d11ce1c3d74ba6918c27319c70fc358a48138a5cc4', // tomiPAY
    '0e9aa50bb3211c93ab48626d53dd631518e33b1eb6cf88638a83e2a0a377e3d0', // Catecoin Wallet
    'bfad79e3d89bfb915b1e230000179a8ffc8e04f3f78a396d2e4f3e1a51223529', // UKISS Hub
    'ca331388cfe708d3c0fb094f4b08fb3c7ebd7778d3dfdcecb728990e178a3d81', // Tidus Wallet
    'd166c283d59164538cdc50e414546a7433d5f62b9410c9aa563e4e2ec496a106', // Zelcore
    'aba1f652e61fd536e8a7a5cd5e0319c9047c435ef8f7e907717361ff33bb3588', // GateWeb3
    '6af02afbc4ac21d339fb4290d048d48f9f73c3b1a307a994f0474329948c0e5a', // UTORG
];
