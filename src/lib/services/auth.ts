import { type Address, createWalletClient, custom } from 'viem';

export interface AuthSession {
    address: Address;
    chainId: number;
    signature: string;
    nonce: string;
    expiresAt: number;
    // Will be used when implementing JWT
    // token?: string;
}

export function useAuth() {
    const generateNonce = () => {
        return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    };

    const signMessage = async (address: Address): Promise<string> => {
        const nonce = generateNonce();
        const message = 
            `Welcome to SharkMe!

            Please sign this message to verify your wallet ownership on BSC Testnet.
            This signature will not trigger any blockchain transaction or cost any gas fees.

            Wallet: ${address}
            Network: BSC Testnet (Chain ID: 97)
            Nonce: ${nonce}

            This signature is valid for 24 hours.`;

        try {
            const client = createWalletClient({
                transport: custom(window.ethereum),
                chain: {
                    id: 97,
                    name: 'BSC Testnet',
                    nativeCurrency: {
                        name: 'Binance Coin',
                        symbol: 'BNB',
                        decimals: 18
                    },
                    rpcUrls: {
                        default: {
                            http: ['https://data-seed-prebsc-1-s1.binance.org:8545/']
                        }
                    }
                }
            });

            const signature = await client.signMessage({
                message,
                account: address
            });

            // TODO: Replace localStorage with JWT when backend is implemented
            /*
            Implementation steps:
            1. Send to backend:
               - address
               - signature
               - nonce
               - chainId
            2. Backend verifies:
               - Recovers address from signature
               - Validates nonce
               - Checks if chainId is supported
            3. Backend returns:
               - JWT token
               - expiry time
            4. Store JWT in secure cookie
            */

            // Temporary localStorage solution
            const session: AuthSession = {
                address,
                chainId: 97, // Always BSC Testnet
                signature,
                nonce,
                expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            };

            localStorage.setItem('auth_session', JSON.stringify(session));
            return signature;
        } catch (error) {
            console.error('Sign message failed:', error);
            throw error;
        }
    };

    const getSession = (): AuthSession | null => {
        try {
            const session = localStorage.getItem('auth_session');
            if (!session) return null;

            const parsed = JSON.parse(session) as AuthSession;

            // Check expiry
            if (Date.now() > parsed.expiresAt) {
                localStorage.removeItem('auth_session');
                return null;
            }

            return parsed;
        } catch (error) {
            console.error('Get session failed:', error);
            localStorage.removeItem('auth_session');
            return null;
        }
    };

    const logout = () => {
        // TODO: When implementing backend:
        // 1. Call backend to invalidate JWT
        // 2. Clear secure cookie
        localStorage.removeItem('auth_session');
    };

    return {
        signMessage,
        getSession,
        logout
    };
}
