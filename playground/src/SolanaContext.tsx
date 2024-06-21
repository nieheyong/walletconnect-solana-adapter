import { ReactNode, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css'
import { WalletConnectWalletAdapter } from './lib/walletConnectAdapter'

export const SolanaContext = ({ children }: { children: ReactNode }) => {
	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
	const network = WalletAdapterNetwork.Devnet

	// You can also provide a custom RPC endpoint.
	const endpoint = useMemo(() => clusterApiUrl(network), [network])

	const wallets = useMemo(
		() => [
			new WalletConnectWalletAdapter({
				network: WalletAdapterNetwork.Mainnet,
				options: {
					projectId: 'bd4997ce3ede37c95770ba10a3804dad',
				},
			}),
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[network],
	)

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}
