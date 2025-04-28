import "@/styles/globals.css";

import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";
import { SessionProvider } from "next-auth/react";
import "@rainbow-me/rainbowkit/styles.css";
import { useState, useEffect } from "react";


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

    const config = getDefaultConfig({
        appName: 'NFT Data Marketplace',
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        chains: [mainnet],
        ssr: true, // If your dApp uses server side rendering (SSR)
        autoConnect: true,
    });

    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={pageProps.session} refetchInterval={0}>
                    <RainbowKitProvider modalSize="compact" theme={ darkTheme() }>
                        <Component {...pageProps} />
                    </RainbowKitProvider>
                </SessionProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}