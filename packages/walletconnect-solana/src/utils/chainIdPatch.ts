import { WalletConnectChainID as Chains } from "../adapter.js";

export function getChainsFromChainId(chainId: Chains){
  let chains: Chains[] = [chainId]  
  if(chainId === Chains.Mainnet || chainId === Chains.Deprecated_Mainnet){
    chains = [Chains.Mainnet, Chains.Deprecated_Mainnet]

    if(chainId === Chains.Deprecated_Mainnet) console.warn(chainWarns.mainnet)
      
  }else if(chainId === Chains.Deprecated_Devnet || chainId === Chains.Devnet){
    chains = [Chains.Devnet, Chains.Deprecated_Devnet]
    if(Chains.Deprecated_Devnet) console.warn(chainWarns.devnet)
  }

  return chains
}

const chainWarns = {
  mainnet: `You are using a deprecated chain ID for Solana Mainnet, please use '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp' instead.`,
  devnet: `You are using a deprecated chain ID for Solana Devnet, please use '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp' instead.`
}