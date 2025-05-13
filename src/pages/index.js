import Image from "next/image";
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ConnectWallet() {
    const wallet = useTonWallet();
    const router = useRouter();

    useEffect(() => {
        if (wallet) {
            router.replace('/invitation-code')
        }
    }, [wallet, router])

    return (
        <>
            <div className="relative">

                <div className="relative z-10">
                    <div className="relative z-10 flex flex-col items-center mt-12 gap-8">
                        <section className="relative mt-4">
                            <Image src={"Group 34626.svg"} className="relative z-10" width={380.56} height={227.37} alt="" />
                            <Image src={"/Group 34620.png"} className="absolute -top-28" width={582.76} height={380} alt="" />
                        </section>

                        <section className="p-8 flex flex-col gap-12">
                            <h1 className="text-white nunito text-3xl font-normal uppercase text-center">Connect<br /><span className="text-dao-green">Your wallet</span></h1>
                            <p className="text-center inter text-xs px-12">Connect your Ton wallet to create your unique CARV Identity</p>

                            <div className="relative mx-auto">
                                <TonConnectButton className="absolute h-full w-full mx-auto inset-0 opacity-0" />
                                <button className="border-y-2 border-solid border-dao-green rounded-full px-12 py-3 mx-auto">Connect Wallet</button>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </>
    )
}