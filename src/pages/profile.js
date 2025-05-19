import { LinkProfileCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDIDInfo } from "@/context/DIDContext";
import { useAction } from "@/context/ActionContext";
import { useRank } from "@/context/RankContext";
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTGE } from "@/context/TGEContext";

export default function Profile() {
    const router = useRouter()
    const { userInfo, userProfile, address, clear: clearAuth } = useAuth();
    const { didInfo, clear: clearDID } = useDIDInfo();
    const { clear: clearAction } = useAction();
    const { clear: clearRank } = useRank();
    const { clear: clearTGE } = useTGE();
    const [isCopied, setIsCopied] = useState(false);
    const [tonConnectUI] = useTonConnectUI();

    const copyToClipboard = (text) => {
        console.log(userInfo);
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

    const logOutFunc = async () => {
        await tonConnectUI.disconnect();
        if (window.okxwallet && window.okxwallet.disconnect) {
            await window.okxwallet.disconnect();
        }
        clearTGE();
        clearRank();
        clearAction();
        clearDID();
        clearAuth();

        router.push('/');
    }

    const handleXOauth = async () => {
        const { method, codeChallenge } = await xOauthInfo();

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: TWITTER_CLIENT_ID,
            redirect_uri: TWITTER_CALLBACK_URL,
            scope: 'tweet.read users.read offline.access',
            state: TWITTER_OAUTH_STATE,
            code_challenge: codeChallenge,
            code_challenge_method: method,
        });

        const loginUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;

        // window.open(loginUrl);
        console.log(loginUrl);
        window.location.href = loginUrl;
    }

    const handleDiscordOauth = () => {
        const params = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            redirect_uri: DISCORD_CALLBACK_URL,
            response_type: 'code',
            scope: 'identify email',
            state: DISCORD_OAUTH_STATE
        });

        const loginUrl = `https://discord.com/oauth2/authorize?${params.toString()}`;

        console.log(loginUrl);
        window.location.href = loginUrl;
    }

    return (
        <>
            <div className="flex flex-col gap-4 p-8 pb-32">
                <div id="profile_header" className="rounded-md p-4 flex flex-col">
                    <div className="flex justify-between items-start rounded-md text-white w-full">
                        <div className="flex gap-2 w-fit items-center">
                            <Image src={"/Ellipse 223.png"} className="aspect-auto object-contain" width={55} height={55} alt="" />
                            <div className="flex flex-col gap-0 relative top-0.5">
                                <p className="font-semibold text-xl leading-4">{userProfile.name}</p>
                                <p className="text-white">{didInfo.exist ? `${didInfo.did.slice(0, 8)}...${didInfo.did.slice(66)}` : `${address?.slice(0, 6)}...${address?.slice(42)}`}</p>
                            </div>
                        </div>
                        <Link href={"/profile/edit"}><Image src={"/mage_electricity-fill.svg"} className="rounded-full" width={36} height={36} alt="" /></Link>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        <LinkProfileCard name={"Twitter"} status={userProfile.linkedX} handleFunc={handleXOauth} />
                        <LinkProfileCard name={"Telegram"} status={userProfile.linkedTG} />
                        <LinkProfileCard name={"Discord"} status={userProfile.linkedDiscord} handleFunc={handleDiscordOauth} />
                    </div>
                </div>

                <div className="flex flex-col gap-4 text-dao-gray">
                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-lg">
                        <p className="">Wallet</p>
                        <div className="flex gap-2">
                            <p className="">{`${address?.slice(0, 6)}...${address?.slice(42)}`}</p>
                            <button onClick={() => copyToClipboard(address)} ><Image src={isCopied ? "/check.svg" : "/copy-icon.svg"} className="" width={18} height={18} alt="" /></button>
                        </div>
                    </div>

                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-xl mt-6">
                        <p className="">Invited Code</p>
                        {userInfo.bindedCode ? <p className="">{userInfo.invitedCode}</p> : <Link href={"/profile/invite-code"}><Image src={"/iconamoon_edit.svg"} className="" width={24} height={24} alt="" /></Link>}
                    </div>

                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-xl">
                        <p className="">Privacy Policy</p>
                        <Link href={"/privacy-policy"} className=""><Image src={"/rer5tyFrame.svg"} className="" width={24} height={24} alt="" /></Link>
                    </div>

                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-xl">
                        <p className="">User Agreement</p>
                        <Link href={"/user-agreement"} className=""><Image src={"/rer5tyFrame.svg"} className="" width={24} height={24} alt="" /></Link>
                    </div>
                </div>

                <button onClick={logOutFunc} className="bg-dao-green text-white p-2 rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green">Log Out</button>
            </div>

            <Footer active={"profile"} />
        </>
    )
}