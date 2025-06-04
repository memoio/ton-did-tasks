import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@/components/googleanalytics";
import { ParamsProvider } from "@/context/ParamContext";
import { AuthProvider } from "@/context/AuthContext";
import { DIDProvider } from "@/context/DIDContext";
import { ActionProvider } from "@/context/ActionContext";
import { RankProvider } from "@/context/RankContext";
import { TGEProvider } from "@/context/TGEContext";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TON_DID_WEB_RAW } from "@/components/config/config";

const manifestUrl = `${TON_DID_WEB_RAW}/api/tonconnect-manifest`;
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

    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <ParamsProvider>
                <AuthProvider>
                    <DIDProvider>
                        <ActionProvider>
                            <RankProvider>
                                <TGEProvider>
                                    <Component {...pageProps} />
                                    <GoogleAnalytics />
                                </TGEProvider>
                            </RankProvider>
                        </ActionProvider>
                    </DIDProvider>
                </AuthProvider>
            </ParamsProvider>
        </TonConnectUIProvider>
    )
}