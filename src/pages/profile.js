import { AlertCard, LinkProfileCard, ReferralCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import { CopyIconYellow } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Profile () {
    const router = useRouter()
    const [ic, setIc] = useState(true) //Toggle

    const copyToClipboard = (text) => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text)
              .then(() => pcFunc('flex'))
              .catch(() => copyToClipboardFallback());
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
    };

    const logOutFunc = () => {
        router.push('/')
    }

    return (
        <>
            <div className="flex flex-col gap-4 p-8 pb-32">
                <div id="profile_header" className="rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-start rounded-md text-white w-full">
                        <div className="flex gap-2 w-fit items-center">
                            <Image src={"/Ellipse 223.png"} className="aspect-auto object-contain" width={55} height={55} alt="" />
                            <div className="flex flex-col gap-0 relative top-0.5">
                                <p className="font-semibold text-xl leading-4">Cathy</p>
                                <p className="text-white">did:memo:54tr...dfdd</p>
                            </div>
                        </div>
                        <Link href={"/profile/edit"}><Image src={"/mage_electricity-fill.svg"} className="rounded-full" width={36} height={36} alt="" /></Link>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        <LinkProfileCard name={"Twitter"} status={1} />
                        <LinkProfileCard name={"Telegram"} status={1} />
                        <LinkProfileCard name={"Discord"} status={0} />
                    </div>
                </div>

                <div className="flex flex-col gap-4 text-dao-gray">
                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-lg">
                        <p className="">Wallet</p>
                        <div className="flex gap-2">
                            <p className="">0x06B45...EBFEe</p>
                            <button onClick={ () => copyToClipboard('0x06B45...EBFEe')} ><CopyIconYellow /></button>
                        </div>
                    </div>

                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-xl mt-6">
                        <p className="">Invite Code</p>
                        { ic? <p className="">0x06B45...EBFEe</p>: <Link href={"/profile/invite-code"}><Image src={"/iconamoon_edit.svg"} className="" width={24} height={24} alt=""/></Link> }
                    </div>

                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-xl">
                        <p className="">Privacy Policy</p>
                        <Link href={"/privacy-policy"} className=""><Image src={"/rer5tyFrame.svg"} className="" width={24} height={24} alt=""/></Link>
                    </div>

                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-xl">
                        <p className="">User Agreement</p>
                        <Link href={"/user-agreement"} className=""><Image src={"/rer5tyFrame.svg"} className="" width={24} height={24} alt=""/></Link>
                    </div>
                </div>

                <button onClick={ logOutFunc } className="bg-dao-green text-white p-2 rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green">Log Out</button>
            </div>

            <Footer active={"profile"} />
        </>
    )
}