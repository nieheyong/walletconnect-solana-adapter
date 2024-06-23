import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SolanaContext } from './SolanaContext.tsx'

import { Buffer } from 'buffer'

if (typeof window !== 'undefined' && window.Buffer === undefined) {
	window.Buffer = Buffer
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SolanaContext>
			<App />
		</SolanaContext>
	</React.StrictMode>,
)
