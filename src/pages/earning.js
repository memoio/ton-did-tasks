import { AlertCard, CheckInCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { recordAdd } from "@/components/api/airdrop";
import { xOauthInfo } from "@/components/api/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DailyTask } from "@/components/cards";
import { DiscordLogoIcon, TelegramLogoIconBW, TwitterLogoIcon } from "@/components/icons";
import { useDIDInfo } from "@/context/DIDContext";
import { useAuth } from "@/context/AuthContext";
import { useAction } from "@/context/ActionContext";
import { TON_DID_WEB } from "@/components/config/config";
import { TWITTER_CLIENT_ID, TWITTER_OAUTH_STATE, TWITTER_CALLBACK_URL, DISCORD_OAUTH_STATE, DISCORD_CLIENT_ID, DISCORD_CALLBACK_URL } from '@/components/config/config';
// import { useAccount } from "wagmi";

export default function Earnings() {
    const [isVisible, setIsVisible] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isCheckedIn, setIsCheckedIn] = useState(false)

    const [points, setPoints] = useState(0)
    const [text, setText] = useState(null)
    const [isFailedText, setIsFailedText] = useState(null)

    const { didInfo } = useDIDInfo();
    const { userInfo, userProfile, address, addPoint, isWalletBound } = useAuth();
    const { days, dailyAction, questAction, setDaily, setQuest, finishDailyCheck } = useAction();

    // const router = useRouter();

    const currentUrl = `${TON_DID_WEB}?startapp=${userInfo?.inviteCode}`;
    const tweetText = `📈I found a platform that can own, manage and monetize your data @MemoLabsOrg!

🚀Currently all users can participate, and you can easily get points rewards by completing tasks, and you can also redeem more value!

➡️Experience now ${currentUrl}
`
    const tgText = `🎉 Welcome to the MEMO data ecosystem, a platform where you can own, manage and monetize your data! 💰

🌟 You can easily earn points by completing tasks within the platform, and you can also unlock exclusive tasks with multiple partners to get points!
·Create DID 📝
·Link Social Media Accounts🔗
·Daily Check-in📅
·Joint Activities🤝
·Invite friends👫

🚀 Click ${currentUrl} to start your data value-added journey!
`

    const closeFunc = () => {
        if (isVisible || isFailed || isSuccess || isCheckedIn) {
            setIsVisible(false)
            setIsFailed(false)
            setIsSuccess(false)
            setIsCheckedIn(false)
        } else {
            setIsVisible(true)
            setIsFailed(true)
            setIsSuccess(true)
            setIsCheckedIn(true)
        }
    }

    const finishTask = async (action, point, txt, failText, url) => {
        if (didInfo.exist && address) {
            if ((userProfile.linkedX && userProfile.linkedDiscord && userProfile.linkedTG) || action === 70) {
                setPoints(point);
                setText(txt);
                setIsFailedText(failText);

                if (window.Telegram?.WebApp?.openTelegramLink) {
                    window.Telegram.WebApp.openTelegramLink(url);
                }
                else {
                    window.open(url, '_blank');
                }

                try {
                    await recordAdd(address, action);
                    addPoint(point);
                    if (action >= 70) {
                        setDaily(action - 70);
                        if (action == 70) {
                            finishDailyCheck();
                        }
                    } else {
                        setQuest(action - 50);
                    }
                    setIsVisible(true);
                } catch (err) {
                    setIsFailedText(err.message);
                    setIsFailed(true);
                }
            } else {
                setIsFailedText("Please Link Your X/TG/Discord Account First");
                setIsFailed(true);
            }
        } else {
            setIsFailedText("Please Create DID First");
            setIsFailed(true);
        }
    }

    const getTaskStatus = (day, days, checked) => {
        if (!checked) {
            if (day === days + 1) {
                return "2";
            }
            if (day === 4 && days >= 4) {
                return "2";
            }
        }

        if (day <= days) {
            return "1";
        } else {
            return "0";
        }
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

    if (!isWalletBound) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"Success"} text={"After your friend binds the invitation code & creates a DID, you will receive points as rewards!"} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isCheckedIn && <AlertCard image={"/Frame 34643-celeb.svg"} title={"+10 Points"} text={"Daily check success"} size={87} closeFunc={closeFunc} btn={"Back Tomorrow"} />}
            {isVisible && <AlertCard image={"/Frame 34643-celeb.svg"} title={`+${points} Points`} text={text} size={87} closeFunc={closeFunc} btn={"Back Tomorrow"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={'Failed'} text={isFailedText} size={87} closeFunc={closeFunc} btn={"Back Tomorrow"} />}

            <div className="flex flex-col gap-4 p-8 pb-32">
                <div className="bg-dao-green p-4 rounded-lg text-white flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="flex gap-2"><Image src={"/mdi_star-four-points-circle-outline-gold.svg"} width={22} height={22} alt="" />Points</p>
                        <p className="font-semibold">{userInfo.points}</p>
                    </div>

                    <div className="flex justify-between text-sm">
                        <Link href={"/points-details"} className="flex gap-0">History<Image src={"/uit_angle-up.svg"} width={14} height={14} alt="" /></Link>
                        <p className="">Total</p>
                    </div>
                </div>

                <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                    <h2 className="flex gap-1 items-center font-semibold text-lg text-black dark:text-white">Daily Check <Image src={"/jam_alert.svg"} width={20} height={20} alt="" /></h2>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                        <CheckInCard day={1} status={getTaskStatus(1, days, dailyAction.has(0))} checkInFunc={async () => { finishTask(70, 20, "Daily Check-In", "Please Check-In", "https://x.com/MemoLabsOrg") }} />
                        <CheckInCard day={2} status={getTaskStatus(2, days, dailyAction.has(0))} checkInFunc={async () => { finishTask(70, 20, "Daily Check-In", "Please Check-In", "https://x.com/MemoLabsOrg") }} />
                        <CheckInCard day={3} status={getTaskStatus(3, days, dailyAction.has(0))} checkInFunc={async () => { finishTask(70, 20, "Daily Check-In", "Please Check-In", "https://x.com/MemoLabsOrg") }} />
                        <CheckInCard day={4} status={getTaskStatus(4, days, dailyAction.has(0))} checkInFunc={async () => { finishTask(70, 20, "Daily Check-In", "Please Check-In", "https://x.com/MemoLabsOrg") }} />
                    </div>
                </div>

                <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                    <h2 className="font-semibold text-lg text-black dark:text-white">Beginner Quest</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        <DailyTask checked={userProfile.linkedX} point={"100"} done={"linked"} todo={"link"} updateFunc={() => handleXOauth()} text={"link X Account"} icon={<TwitterLogoIcon />} />
                        <DailyTask checked={userProfile.linkedDiscord} point={"100"} done={"linked"} todo={"link"} updateFunc={() => handleDiscordOauth()} text={"link Discord Account"} icon={<DiscordLogoIcon />} />
                    </div >
                </div >

                <div className="flex bg-dao-green p-4 rounded-[10px] text-white border border-solid border-main-blue">
                    <div className="w-3/4">
                        <h2 className="font-semibold text-xl">Play to Earn</h2>
                        <p className="">Earn Points with Every Tap!</p>
                        <Link href={"/play-game"} className=""><Image src={"basil_arrow-up-solid-green-bg.svg"} width={32} height={32} alt="" /></Link>
                    </div>
                    <Image src={"/openmoji_double-tap.svg"} width={56} height={56} alt="" />
                </div>

                {
                    userProfile.linkedX && userProfile.linkedDiscord && userProfile.linkedTG && (
                        <div>
                            <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                                <h2 className="font-semibold text-lg text-black dark:text-white">Daily Task</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <DailyTask checked={dailyAction.has(1)} done={"shared"} todo={"share"} updateFunc={() => finishTask(71, 20, "Share Referral Link to TG", "Please confirm that you have shared referral link to TG", 'https://t.me/share/url?url=' + encodeURIComponent(currentUrl) + '&text=' + encodeURIComponent(tgText))} text={"Share Referral Link to TG"} icon={<TwitterLogoIcon />} />
                                    <DailyTask checked={dailyAction.has(2)} done={"shared"} todo={"share"} updateFunc={() => finishTask(72, 20, "Share Referral Link to Discord", "Please confirm that you have shared referral link to Discord", 'https://discord.com/invite/YG4Ydv2E7X')} text={"Share Referral Link to Discord"} icon={<DiscordLogoIcon />} />
                                    <DailyTask checked={dailyAction.has(3)} done={"shared"} todo={"share"} updateFunc={() => finishTask(73, 20, "Share Referral Link to X", "Please confirm that you have shared referral link to X", 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText))} text={"Share Referral Link to X"} icon={<TelegramLogoIconBW />} />
                                </div >
                            </div >

                            <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                                <h2 className="font-semibold text-lg text-black dark:text-white">Community Task</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <DailyTask checked={questAction.has(0)} point={"50"} done={"followed"} todo={"follow"} updateFunc={() => finishTask(50, 50, "Follow Memo X Claim Success", "Please confirm that you have followed MEMO X", "https://x.com/MemoLabsOrg")} text={"Follow X"} icon={<TwitterLogoIcon />} />
                                    <DailyTask checked={questAction.has(1)} point={"50"} done={"joined"} todo={"join"} updateFunc={() => finishTask(51, 50, "Join TG Claim Success", "Please confirm that you have joined MEMO telegram", "https://t.me/memolabsio")} text={"Join Telegram"} icon={<TelegramLogoIconBW />} />
                                    <DailyTask checked={questAction.has(2)} point={"50"} done={"joined"} todo={"join"} updateFunc={() => finishTask(52, 50, "Join Discord Claim Success", "Please confirm that you have joined MEMO discord", 'https://discord.com/invite/YG4Ydv2E7X')} text={"Join Discord"} icon={<svg width="20" height="20" viewBox="0 0 20 20" className="fill-dark-bg border border-solid border-black p-1.5 rounded size-10 dark:fill-white dark:border-light-green/19" xmlns="http://www.w3.org/2000/svg"><path d="M16.0588 4.44036C14.9504 3.9237 13.7504 3.5487 12.5004 3.33203C12.4784 3.33234 12.4575 3.34133 12.4421 3.35703C12.2921 3.63203 12.1171 3.99036 12.0004 4.26536C10.6746 4.06549 9.32627 4.06549 8.00042 4.26536C7.88376 3.98203 7.70876 3.63203 7.55042 3.35703C7.54209 3.34036 7.51709 3.33203 7.49209 3.33203C6.24209 3.5487 5.05042 3.9237 3.93376 4.44036C3.92542 4.44036 3.91709 4.4487 3.90876 4.45703C1.64209 7.8487 1.01709 11.1487 1.32542 14.4154C1.32542 14.432 1.33376 14.4487 1.35042 14.457C2.85042 15.557 4.29209 16.2237 5.71709 16.6654C5.74209 16.6737 5.76709 16.6654 5.77542 16.6487C6.10876 16.1904 6.40876 15.707 6.66709 15.1987C6.68376 15.1654 6.66709 15.132 6.63376 15.1237C6.15876 14.9404 5.70876 14.7237 5.26709 14.4737C5.23376 14.457 5.23376 14.407 5.25876 14.382C5.35042 14.3154 5.44209 14.2404 5.53376 14.1737C5.55042 14.157 5.57542 14.157 5.59209 14.1654C8.45876 15.4737 11.5504 15.4737 14.3838 14.1654C14.4004 14.157 14.4254 14.157 14.4421 14.1737C14.5338 14.2487 14.6254 14.3154 14.7171 14.3904C14.7504 14.4154 14.7504 14.4654 14.7088 14.482C14.2754 14.7404 13.8171 14.9487 13.3421 15.132C13.3088 15.1404 13.3004 15.182 13.3088 15.207C13.5754 15.7154 13.8754 16.1987 14.2004 16.657C14.2254 16.6654 14.2504 16.6737 14.2754 16.6654C15.7088 16.2237 17.1504 15.557 18.6504 14.457C18.6671 14.4487 18.6754 14.432 18.6754 14.4154C19.0421 10.6404 18.0671 7.36536 16.0921 4.45703C16.0838 4.4487 16.0754 4.44036 16.0588 4.44036ZM7.10042 12.4237C6.24209 12.4237 5.52542 11.632 5.52542 10.657C5.52542 9.68203 6.22542 8.89037 7.10042 8.89037C7.98376 8.89037 8.68376 9.69037 8.67542 10.657C8.67542 11.632 7.97542 12.4237 7.10042 12.4237ZM12.9088 12.4237C12.0504 12.4237 11.3338 11.632 11.3338 10.657C11.3338 9.68203 12.0338 8.89037 12.9088 8.89037C13.7921 8.89037 14.4921 9.69037 14.4838 10.657C14.4838 11.632 13.7921 12.4237 12.9088 12.4237Z" /></svg>} />
                                </div >
                            </div >
                        </div>
                    )
                }

                {/* <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                    <h2 className="font-semibold text-lg text-black dark:text-white">Daily Task</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        <DailyTask checked={dailyAction.has(1)} done={"shared"} todo={"share"} updateFunc={() => finishTask(71, 20, "Share Referral Link to TG", "Please confirm that you have shared referral link to TG", 'https://t.me/share/url?url=' + encodeURIComponent(currentUrl) + '&text=' + encodeURIComponent(tgText))} text={"Share Referral Link to TG"} icon={<TwitterLogoIcon />} />
                        <DailyTask checked={dailyAction.has(2)} done={"shared"} todo={"share"} updateFunc={() => finishTask(72, 20, "Share Referral Link to Discord", "Please confirm that you have shared referral link to Discord", 'https://discord.com/invite/YG4Ydv2E7X')} text={"Share Referral Link to Discord"} icon={<DiscordLogoIcon />} />
                        <DailyTask checked={dailyAction.has(3)} done={"shared"} todo={"share"} updateFunc={() => finishTask(73, 20, "Share Referral Link to X", "Please confirm that you have shared referral link to X", 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText))} text={"Share Referral Link to X"} icon={<TelegramLogoIconBW />} />
                    </div >
                </div >

                <div className="flex bg-dao-green p-4 rounded-[10px] text-white border border-solid border-main-blue">
                    <div className="w-3/4">
                        <h2 className="font-semibold text-xl">Play to Earn</h2>
                        <p className="">Earn Points with Every Tap!</p>
                        <Link href={"/play-game"} className=""><Image src={"basil_arrow-up-solid-green-bg.svg"} width={32} height={32} alt="" /></Link>
                    </div>
                    <Image src={"/openmoji_double-tap.svg"} width={56} height={56} alt="" />
                </div>

                <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                    <h2 className="font-semibold text-lg text-black dark:text-white">Community Task</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        <DailyTask checked={questAction.has(0)} point={"50"} done={"followed"} todo={"follow"} updateFunc={() => finishTask(50, 50, "Follow Memo X Claim Success", "Please confirm that you have followed MEMO X", "https://x.com/MemoLabsOrg")} text={"Follow X"} icon={<TwitterLogoIcon />} />
                        <DailyTask checked={questAction.has(1)} point={"50"} done={"joined"} todo={"join"} updateFunc={() => finishTask(51, 50, "Join TG Claim Success", "Please confirm that you have joined MEMO telegram", "https://t.me/memolabsio")} text={"Join Telegram"} icon={<TelegramLogoIconBW />} />
                        <DailyTask checked={questAction.has(2)} point={"50"} done={"joined"} todo={"join"} updateFunc={() => finishTask(52, 50, "Join Discord Claim Success", "Please confirm that you have joined MEMO discord", 'https://discord.com/invite/YG4Ydv2E7X')} text={"Join Discord"} icon={<svg width="20" height="20" viewBox="0 0 20 20" className="fill-dark-bg border border-solid border-black p-1.5 rounded size-10 dark:fill-white dark:border-light-green/19" xmlns="http://www.w3.org/2000/svg"><path d="M16.0588 4.44036C14.9504 3.9237 13.7504 3.5487 12.5004 3.33203C12.4784 3.33234 12.4575 3.34133 12.4421 3.35703C12.2921 3.63203 12.1171 3.99036 12.0004 4.26536C10.6746 4.06549 9.32627 4.06549 8.00042 4.26536C7.88376 3.98203 7.70876 3.63203 7.55042 3.35703C7.54209 3.34036 7.51709 3.33203 7.49209 3.33203C6.24209 3.5487 5.05042 3.9237 3.93376 4.44036C3.92542 4.44036 3.91709 4.4487 3.90876 4.45703C1.64209 7.8487 1.01709 11.1487 1.32542 14.4154C1.32542 14.432 1.33376 14.4487 1.35042 14.457C2.85042 15.557 4.29209 16.2237 5.71709 16.6654C5.74209 16.6737 5.76709 16.6654 5.77542 16.6487C6.10876 16.1904 6.40876 15.707 6.66709 15.1987C6.68376 15.1654 6.66709 15.132 6.63376 15.1237C6.15876 14.9404 5.70876 14.7237 5.26709 14.4737C5.23376 14.457 5.23376 14.407 5.25876 14.382C5.35042 14.3154 5.44209 14.2404 5.53376 14.1737C5.55042 14.157 5.57542 14.157 5.59209 14.1654C8.45876 15.4737 11.5504 15.4737 14.3838 14.1654C14.4004 14.157 14.4254 14.157 14.4421 14.1737C14.5338 14.2487 14.6254 14.3154 14.7171 14.3904C14.7504 14.4154 14.7504 14.4654 14.7088 14.482C14.2754 14.7404 13.8171 14.9487 13.3421 15.132C13.3088 15.1404 13.3004 15.182 13.3088 15.207C13.5754 15.7154 13.8754 16.1987 14.2004 16.657C14.2254 16.6654 14.2504 16.6737 14.2754 16.6654C15.7088 16.2237 17.1504 15.557 18.6504 14.457C18.6671 14.4487 18.6754 14.432 18.6754 14.4154C19.0421 10.6404 18.0671 7.36536 16.0921 4.45703C16.0838 4.4487 16.0754 4.44036 16.0588 4.44036ZM7.10042 12.4237C6.24209 12.4237 5.52542 11.632 5.52542 10.657C5.52542 9.68203 6.22542 8.89037 7.10042 8.89037C7.98376 8.89037 8.68376 9.69037 8.67542 10.657C8.67542 11.632 7.97542 12.4237 7.10042 12.4237ZM12.9088 12.4237C12.0504 12.4237 11.3338 11.632 11.3338 10.657C11.3338 9.68203 12.0338 8.89037 12.9088 8.89037C13.7921 8.89037 14.4921 9.69037 14.4838 10.657C14.4838 11.632 13.7921 12.4237 12.9088 12.4237Z" /></svg>} />
                    </div >
                </div > */}
            </div >
            <Footer active={"earning"} />
        </>
    )
}