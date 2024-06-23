import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { RequestAirdrop } from './components/RequestAirdrop'
import { SignMessage } from './components/signMessage'
import { SendLegacyTransaction } from './components/SendLegacyTransaction'
import { SignTransaction } from './components/SignTransaction'
import { SendTransaction } from './components/SendTransaction'
import { SendV0Transaction } from './components/SendV0Transaction'

function App() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
			<WalletMultiButton />
			<WalletDisconnectButton />
			<Toaster />

			{/* Wallet Interaction */}
			<SignMessage />
			<SignTransaction />
			<SendTransaction />
			<SendV0Transaction />
			<SendLegacyTransaction />
			<RequestAirdrop />
		</div>
	)
}

export default App
