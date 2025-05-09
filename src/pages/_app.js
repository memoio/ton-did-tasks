import "@/styles/globals.css";

import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { RainbowKitProvider, getDefaultConfig, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
    metaMaskWallet,
    okxWallet,
    injectedWallet,
    coinbaseWallet,
    tokenPocketWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { mainnet } from "wagmi/chains";
// import { SessionProvider } from "next-auth/react";
import "@rainbow-me/rainbowkit/styles.css";
import { useState, useEffect } from "react";

import { AuthProvider } from "@/context/AuthContext";
import { DIDProvider } from "@/context/DIDContext";
import { ActionProvider } from "@/context/ActionContext";
import { RankProvider } from "@/context/RankContext";
// import { TonConnectUIProvider } from '@tonconnect/ui-react';

// const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';
export default function App({ Component, pageProps }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Load theme preference from localStorage
        const storedTheme = localStorage.getItem('theme');
        const root = document.documentElement;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            root.classList.add('dark');
            setIsDark(true);
        }
    }, []);
    const connectors = connectorsForWallets(
        [
            {
                groupName: 'Recommended',
                wallets: [metaMaskWallet, injectedWallet, tokenPocketWallet, okxWallet, coinbaseWallet],
            },
        ],
        {
            appName: 'ton did tasks',
            projectId: 'a4c0191a67edd0463e46fc2c3380a3f8',
        }
    );

    const config = getDefaultConfig({
        connectors,
        appName: 'Droppod',
        projectId: '7f53a384c8af77150b1d37c11a864491',
        chains: [mainnet],
        ssr: false, // If your dApp uses server side rendering (SSR)
        autoConnect: true,
    });

    const queryClient = new QueryClient();

    return (
        // <TonConnectUIProvider manifestUrl={manifestUrl}>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider coolMode locale="en-US" modalSize="compact" theme={darkTheme({
                    accentColor: '#4f46e5',
                    borderRadius: 'medium'
                })}
                >
                    {/* <SessionProvider session={pageProps.session} refetchInterval={0}> */}
                    <AuthProvider>
                        <DIDProvider>
                            <ActionProvider>
                                <RankProvider>
                                    <Component {...pageProps} />
                                </RankProvider>
                            </ActionProvider>
                        </DIDProvider>
                    </AuthProvider>
                    {/* </SessionProvider> */}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
        // </TonConnectUIProvider>
    )
}