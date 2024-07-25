import { Transaction, VersionedTransaction, PublicKey } from '@solana/web3.js'
import {
  UniversalProvider,
  type ConnectParams,
} from '@walletconnect/universal-provider'
import type { SessionTypes, SignClientTypes } from '@walletconnect/types'
import { parseAccountId } from '@walletconnect/utils'
import base58 from 'bs58'
import { ClientNotInitializedError } from './errors'
import {
  getChainsFromChainId,
  getDefaultChainFromSession,
} from './utils/chainIdPatch'
import { WalletConnectionError } from '@solana/wallet-adapter-base'
import { EventEmitter } from 'events'

type UniversalProviderType = Awaited<ReturnType<typeof UniversalProvider.init>>

export interface WalletConnectWalletAdapterConfig {
  network: WalletConnectChainID
  options: SignClientTypes.Options
}

export enum WalletConnectChainID {
  Mainnet = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  Devnet = 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
  Deprecated_Mainnet = 'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
  Deprecated_Devnet = 'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
}

export enum WalletConnectRPCMethods {
  signTransaction = 'solana_signTransaction',
  signMessage = 'solana_signMessage',
}

interface WalletConnectWalletInit {
  publicKey: PublicKey
}

const getConnectParams = (chainId: WalletConnectChainID): ConnectParams => {
  /** Workaround to support old chain Id configuration */
  const chains = getChainsFromChainId(chainId)

  return {
    optionalNamespaces: {
      solana: {
        chains,
        methods: [
          WalletConnectRPCMethods.signTransaction,
          WalletConnectRPCMethods.signMessage,
        ],
        events: [],
      },
    },
  }
}

const isVersionedTransaction = (
  transaction: Transaction | VersionedTransaction,
): transaction is VersionedTransaction => 'version' in transaction

export class WalletConnectWallet {
  public events = new EventEmitter()
  private _UniversalProvider: UniversalProviderType | undefined
  private _session: SessionTypes.Struct | undefined
  private _projectId: string
  private _network: WalletConnectChainID
  private _ConnectQueueResolver: ((value: unknown) => void) | undefined

  constructor(config: WalletConnectWalletAdapterConfig) {
    this.initClient(config.options)
    this._network = config.network

    if (!config.options.projectId) {
      throw Error('WalletConnect Adapter: Project ID is undefined')
    }
    this._projectId = config.options.projectId
  }

  async connect(): Promise<WalletConnectWalletInit> {
    if (!this._UniversalProvider) {
      await new Promise((res) => {
        this._ConnectQueueResolver = res
      })
    }
    if (!this._UniversalProvider) {
      throw new Error(
        "WalletConnect Adapter - Universal Provider was undefined while calling 'connect()'",
      )
    }

    if (this._UniversalProvider.session) {
      this._session = this._UniversalProvider.session
      const defaultNetwork = getDefaultChainFromSession(
        this._session,
        this._network,
      ) as WalletConnectChainID
      this._network = defaultNetwork
      this._UniversalProvider.setDefaultChain(defaultNetwork)
      return {
        publicKey: this.publicKey,
      }
    } else {
      try {
        const session = await new Promise<SessionTypes.Struct | undefined>(
          async (resolve, reject) => {
            await this._UniversalProvider
              ?.connect({
                // TODO: maybe optionalNamespaces: getConnectParams(this._network).optionalNamespaces,
                namespaces: getConnectParams(this._network).optionalNamespaces,
              })
              .then((session?: SessionTypes.Struct) => {
                resolve(session)
              })
              .catch((error: Error) => {
                reject(new Error(error.message))
              })
          },
        )

        this._session = session
        if (!session) {
          throw new WalletConnectionError()
        }
        const defaultNetwork = getDefaultChainFromSession(
          session,
          this._network,
        ) as WalletConnectChainID
        this._network = defaultNetwork
        this._UniversalProvider?.setDefaultChain(defaultNetwork)

        return { publicKey: this.publicKey }
      } catch (error: unknown) {
        throw error
      }
    }
  }

  async disconnect() {
    if (this._UniversalProvider?.session) {
      await this._UniversalProvider.disconnect()
      this._session = undefined
    } else {
      throw new ClientNotInitializedError()
    }
  }

  get client(): UniversalProviderType {
    if (this._UniversalProvider) {
      // TODO: using client.off throws an error
      return this._UniversalProvider
      // return this._client;
    } else {
      throw new ClientNotInitializedError()
    }
  }

  get publicKey(): PublicKey {
    if (this._UniversalProvider?.session && this._session) {
      const { address } = parseAccountId(
        this._session.namespaces.solana.accounts[0],
      )

      return new PublicKey(address)
    } else {
      throw new ClientNotInitializedError()
    }
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
  ): Promise<T> {
    if (this._UniversalProvider?.session && this._session) {
      let rawTransaction: string
      let legacyTransaction: Transaction | VersionedTransaction | undefined

      if (isVersionedTransaction(transaction)) {
        // V0 transactions are serialized and passed in the `transaction` property
        rawTransaction = Buffer.from(transaction.serialize()).toString('base64')

        if (transaction.version === 'legacy') {
          // For backwards-compatible, legacy transactions are spread in the params
          legacyTransaction = Transaction.from(transaction.serialize())
        }
      } else {
        rawTransaction = transaction
          .serialize({
            requireAllSignatures: false,
            verifySignatures: false,
          })
          .toString('base64')
        legacyTransaction = transaction
      }

      const { signature } = await this._UniversalProvider.client.request<{
        signature: string
      }>({
        chainId: this._network,
        topic: this._session.topic,
        request: {
          method: WalletConnectRPCMethods.signTransaction,
          params: {
            // Passing ...legacyTransaction is deprecated.
            // All new clients should rely on the `transaction` parameter.
            // The future versions will stop passing ...legacyTransaction.
            ...legacyTransaction,
            // New base64-encoded serialized transaction request parameter
            transaction: rawTransaction,
          },
        },
      })
      transaction.addSignature(
        this.publicKey,
        Buffer.from(base58.decode(signature)),
      )

      return transaction
    } else {
      throw new ClientNotInitializedError()
    }
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    if (this._UniversalProvider?.session && this._session) {
      const { signature } = await this._UniversalProvider.client.request<{
        signature: string
      }>({
        // The network does not change the output of message signing, but this is a required parameter for SignClient
        chainId: this._network,
        topic: this._session.topic,
        request: {
          method: WalletConnectRPCMethods.signMessage,
          params: {
            pubkey: this.publicKey.toString(),
            message: base58.encode(message),
          },
        },
      })

      return base58.decode(signature)
    } else {
      throw new ClientNotInitializedError()
    }
  }

  async initClient(options: SignClientTypes.Options) {
    const provider = await UniversalProvider.init(options)
    this._UniversalProvider = provider
    this.registerEventListeners()
    if (this._ConnectQueueResolver) this._ConnectQueueResolver(true)
  }

  public registerEventListeners() {
    const provider = this._UniversalProvider!

    const allEvent = [
      'session_event',
      'chainChanged',
      'session_update',
      'session_delete',
      'display_uri',
    ]

    for (const event of allEvent) {
      provider.on(event, (...args: any) => {
        this.events.emit(event, ...args)
      })
    }
  }
}
