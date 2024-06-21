import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import './App.css'

function App() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
			Solana
			<WalletMultiButton />
			<WalletDisconnectButton />
		</div>
	)
}

export default App
