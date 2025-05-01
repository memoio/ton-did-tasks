import { AlertCard, ReferralCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { TON_DID_WEB } from "@/components/config/config";

export default function Earnings() {
    const popup = useRef(null)
    const [isCopied, setIsCopied] = useState(false)
    const { userInfo } = useAuth()

    const router = useRouter();

    // const currentUrl = `${TON_DID_WEB}?startapp=${userInfo?.inviteCode}`;

    const handleInviteTG = () => {
        if (window.Telegram?.WebApp?.openTelegramLink) {
            window.Telegram.WebApp.openTelegramLink(urls[0].url);
        }
        else {
            window.open(urls[0].url, '_blank');
        }
    };

    const copyToClipboard = (text) => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => setIsCopied(true))
                .then(() => setTimeout(() => setIsCopied(false), 1500))
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        }
    };

    return (
        <>
            {/* {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"Copy success"} size={87} closeFunc={closeFunc} />} */}
            <div ref={popup} className="bg-black/60 fixed inset-0 z-50 hidden" onClick={() => {
                popup.current.classList.toggle('hidden')
                popup.current.classList.toggle('block')
            }}>
                <div className="absolute top-94 left-0 w-full">
                    <div className="w-0 h-0 border-10 border-solid border-transparent border-t-white rotate-180 dark:border-t-[#242424] relative left-70"></div>
                    <p className="bg-white p-4 w-2/3 text-sm rounded-lg text-black dark:border dark:border-solid dark:border-[#242424] dark:bg-[#060706] dark:text-white relative left-20">Once your friends complete the following tasks to activate their accounts, you will be rewarded with points!</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-8 pb-28">
                <div className="bg-dao-green p-4 rounded-lg text-white flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="flex gap-2"><Image src={"/connection 1.svg"} width={24} height={24} alt="" />Referral</p>
                        <p className="font-semibold">{userInfo.inviteCount}</p>
                    </div>

                    <div className="flex justify-between text-sm">
                        <Link href={"/points-details"} className="flex gap-0">History<Image src={"/uit_angle-up.svg"} width={14} height={14} alt="" /></Link>
                        <p className="">Total</p>
                    </div>
                </div>

                <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke text-black dark:text-white p-4 rounded-lg flex flex-col gap-2">
                    <h2 className="text-lg font-bold">Referral Link</h2>
                    <p className="bg-[#1D1F1D]/8 p-4 rounded-md dark:bg-[#1D1F1D]">{`${TON_DID_WEB}?startapp=${userInfo?.inviteCode}`}</p>
                    <div className="flex gap-2 items-center justify-center mt-1">
                        <button onClick={handleInviteTG} className="bg-dao-green w-full text-white rounded-full p-1.5">Share Link</button>
                        <button onClick={() => copyToClipboard(`${TON_DID_WEB}?startapp=${userInfo?.inviteCode}`)} className=""><Image src={isCopied ? "/check.svg" : "/meteor-icons_copy.svg"} width={35} height={35} alt="" /></button>
                    </div>
                </div>

                <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px] flex flex-col gap-2">
                    <h2 className="flex gap-1 items-center font-semibold text-lg text-black dark:text-white">Invite friends to get benefits <Image src={"/jam_alert.svg"} width={20} height={20} alt="" onClick={() => {
                        popup.current.classList.toggle('hidden')
                        popup.current.classList.toggle('block')
                    }} /></h2>

                    <div className="flex flex-col gap-2 mt-2 dark:hidden">
                        <ReferralCard icon={"/Frame 34630.svg"} text={"Friends successfully bound your invitation code."} points={200} />
                        <ReferralCard icon={"/Frame 34630-b.svg"} text={"Friends successfully created their data DID."} points={200} />
                    </div>

                    <div className="hidden flex-col gap-2 mt-2 dark:flex">
                        <ReferralCard icon={"/Frame 34630-w.svg"} text={"Friends successfully bound your invitation code."} points={200} />
                        <ReferralCard icon={"/Frame 34630-b-w.svg"} text={"Friends successfully created their data DID."} points={200} />
                    </div>
                </div>
            </div>

            <Footer active={"referral"} />
        </>
    )
}