import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WalletConnectionCard } from "@/components/cards";
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function Home() {
    const router = useRouter()
    const { isConnected, address } = useAccount();
    const [elState, setElState] = useState(null);
    const { openConnectModal } = useConnectModal();

    useEffect(() => {
        if (isConnected) {
            router.push('/invitation-code');
        }
    }, [isConnected, router])

    // const handleFaucetClick = useCallback(() => {
    //     if (openConnectModal && !isConnected) {
    //         openConnectModal();
    //     }
    // }, [isConnected, openConnectModal]);
    const handleConnect = () => {
        console.log(isConnected);
        if (!isConnected) {
            openConnectModal();
        }
    }

    return (
        <div className="min-h-screen max-h-screen w-full flex flex-col gap-8 items-center text-dao-yellow dark:text-white p-8">
            <h1 className="flex items-center justify-center gap-4 font-bold text-xl pt-12"><Image src={"/si_wallet-line.svg"} width={24} height={24} alt="" />Connect Wallet</h1>

            <div className="flex flex-col gap-4 w-full">
                {/* <ConnectButton /> */}
                <WalletConnectionCard id={1} elState={elState} fx={() => handleConnect()} image={"/6323b6987f8e01af2ce9189a_public 1.svg"} name={"Token Pocket"} />
                <WalletConnectionCard id={2} elState={elState} fx={() => handleConnect()} image={"/images__1_-removebg-preview 1.svg"} name={"Metamask"} />
                <WalletConnectionCard id={3} elState={elState} fx={() => handleConnect()} image={"/free-coinbase-logo-icon-download-in-svg-png-gif-file-formats--web-crypro-trading-platform-logos-pack-icons-7651204 1.svg"} name={"Coinbase"} />
                <WalletConnectionCard id={4} elState={elState} fx={() => handleConnect()} image={"/google-wallet2132 1.svg"} name={"Browser Wallet"} />
            </div>
        </div>
    );
}