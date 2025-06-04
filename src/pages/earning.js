import { AlertCard, CheckInCard, DailyTask, LinkTask } from "@/components/cards";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { recordAdd } from "@/components/api/airdrop";
import { xOauthInfo } from "@/components/api/link";
import { getUserProfile } from "@/components/api/profile";
import { useState } from "react";
import { DiscordLogoIcon, TelegramLogoIconBW, TwitterLogoIcon } from "@/components/icons";
import { base64UrlEncode } from "@/components/params";
import { useParams } from "@/context/ParamContext";
import { useDIDInfo } from "@/context/DIDContext";
import { useAuth } from "@/context/AuthContext";
import { useAction } from "@/context/ActionContext";
import { TON_DID_WEB } from "@/components/config/config";
import { TWITTER_CLIENT_ID, TWITTER_OAUTH_STATE, TWITTER_CALLBACK_URL, DISCORD_OAUTH_STATE, DISCORD_CLIENT_ID, DISCORD_CALLBACK_URL } from '@/components/config/config';

export default function Earnings() {
    const [isVisible, setIsVisible] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isCheckedIn, setIsCheckedIn] = useState(false)

    const [points, setPoints] = useState(0)
    const [text, setText] = useState(null)
    const [isFailedText, setIsFailedText] = useState(null)

    const { params } = useParams();
    const { didInfo, loaded } = useDIDInfo();
    const { userInfo, userProfile, address, setName } = useAuth();
    const { days, dailyAction, questAction, finishAction } = useAction();

    // const router = useRouter();

    const currentUrl = `${TON_DID_WEB}?startapp=${base64UrlEncode(`code=${userInfo?.inviteCode}`)}`;
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

    const finishTask = async (action, point, txt, failText) => {
        if (didInfo.exist && address) {
            if ((userProfile.linkedX && userProfile.linkedDiscord) || action === 70) {
                setPoints(point);
                setText(txt);
                setIsFailedText(failText);

                try {
                    await recordAdd(address, action);
                    finishAction(action);
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
            state: `${TWITTER_OAUTH_STATE} ${address}`,
            code_challenge: codeChallenge,
            code_challenge_method: method,
        });

        const loginUrl = `https://x.com/i/oauth2/authorize?${params.toString()}`;
        if (window.Telegram?.WebApp?.openLink) {
            window.Telegram.WebApp.openLink(loginUrl, "_blank");
        }
        else {
            window.open(loginUrl, '_blank');
        }
    }

    const verifyXOauth = async () => {
        if (address) {
            if (userProfile.linkedX) {
                setText("Link X Account Success");
                setPoints(100);
                setIsVisible(true);
            } else {
                try {
                    const profile = await getUserProfile(address);

                    if (profile.twitter_info.twitter_id !== "") {
                        setName(profile.twitter_info.twitter_name);
                        setText("Link X Account Success");
                        finishAction(54);
                        setPoints(100);
                        setIsVisible(true);
                    } else {
                        setIsFailedText("Please Confirm You Have Linked Your X Account");
                        setIsFailed(true);
                    }
                } catch (err) {
                    setIsFailedText(err.message);
                    setIsFailed(true);
                }
            }
        }
    }

    const handleDiscordOauth = () => {
        const params = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            redirect_uri: DISCORD_CALLBACK_URL,
            response_type: 'code',
            scope: 'identify email',
            state: `${DISCORD_OAUTH_STATE} ${address}`
        });

        const loginUrl = `https://discord.com/oauth2/authorize?${params.toString()}`;
        if (window.Telegram?.WebApp?.openLink) {
            window.Telegram.WebApp.openLink(loginUrl, "_blank");
        }
        else {
            window.open(loginUrl, '_blank');
        }
    }

    const verifyDiscordOauth = async () => {
        if (address) {
            if (userProfile.linkedDiscord) {
                setText("Link Discord Account Success");
                setPoints(100);
                setIsVisible(true);
            } else {
                try {
                    const profile = await getUserProfile(address);

                    if (profile.discord_info.discord_id !== "") {
                        setName(profile.discord_info.discord_name, "discord");
                        setText("Link Discord Account Success");
                        setPoints(100);
                        finishAction(56);
                        setIsVisible(true);
                    } else {
                        setIsFailedText("Please Confirm You Have Linked Your Discord Account");
                        setIsFailed(true);
                    }
                } catch (err) {
                    setIsFailedText(err.message);
                    setIsFailed(true);
                }
            }
        }
    }

    if (!loaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"Success"} text={"After your friend binds the invitation code & creates a DID, you will receive points as rewards!"} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {/* {isCheckedIn && <AlertCard image={"/Frame 34643-celeb.svg"} title={"+10 Points"} text={"Daily check success"} size={87} closeFunc={closeFunc} btn={"Back Tomorrow"} />} */}
            {isVisible && <AlertCard image={"/Frame 34643-celeb.svg"} title={`+${points} Points`} text={text} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={'Failed'} text={isFailedText} size={87} closeFunc={closeFunc} btn={"Ok"} />}

            <div className="flex flex-col gap-4 px-4 pt-8 pb-32">
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
                        <LinkTask checked={userProfile.linkedX} loginFunc={handleXOauth} updateFunc={verifyXOauth} text={"link X Account"} icon={<TwitterLogoIcon />} />
                        <LinkTask checked={userProfile.linkedDiscord} loginFunc={handleDiscordOauth} updateFunc={verifyDiscordOauth} text={"link Discord Account"} icon={<DiscordLogoIcon />} />
                    </div >
                </div >

                <div className="flex bg-dao-green p-4 rounded-[10px] text-white border border-solid border-main-blue">
                    <div className="w-3/4">
                        <h2 className="font-semibold text-xl">Play to Earn</h2>
                        <p className="">Earn Points with Every Tap!</p>
                        <button onClick={() => { setIsFailedText("The game will be released later, please stay tuned"); setIsFailed(true); }}><Image src={"basil_arrow-up-solid-green-bg.svg"} width={32} height={32} alt="" /></button>
                        {/* <Link href={"/play-game"} className=""><Image src={"basil_arrow-up-solid-green-bg.svg"} width={32} height={32} alt="" /></Link> */}
                    </div>
                    <Image src={"/openmoji_double-tap.svg"} width={56} height={56} alt="" />
                </div>

                {
                    userProfile.linkedX && userProfile.linkedDiscord && (
                        <div>
                            <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                                <h2 className="font-semibold text-lg text-black dark:text-white">Daily Task</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <DailyTask checked={dailyAction.has(1)} point={"20"} done={"Shared"} todo={"Share"} link={'https://t.me/share/url?url=' + encodeURIComponent(currentUrl) + '&text=' + encodeURIComponent(tgText)} updateFunc={() => finishTask(71, 20, "Share Referral Link to TG", "Please confirm that you have shared referral link to TG")} text={"Share Referral Link to TG"} icon={<TelegramLogoIconBW />} />
                                    <DailyTask checked={dailyAction.has(2)} point={"20"} done={"Shared"} todo={"Share"} link={"https://discord.com/invite/YG4Ydv2E7X"} updateFunc={() => finishTask(72, 20, "Share Referral Link to Discord", "Please confirm that you have shared referral link to Discord")} text={"Share Referral Link to Discord"} icon={<DiscordLogoIcon />} />
                                    <DailyTask checked={dailyAction.has(3)} point={"20"} done={"Shared"} todo={"Share"} link={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText)} updateFunc={() => finishTask(73, 20, "Share Referral Link to X", "Please confirm that you have shared referral link to X")} text={"Share Referral Link to X"} icon={<TwitterLogoIcon />} />
                                </div >
                            </div >

                            <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                                <h2 className="font-semibold text-lg text-black dark:text-white">Community Task</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <DailyTask checked={questAction.has(0)} point={"50"} done={"Followed"} todo={"Follow"} link={"https://x.com/MemoLabsOrg"} updateFunc={() => finishTask(50, 50, "Follow Memo X Claim Success", "Please confirm that you have followed MEMO X")} text={"Follow MemoLabs On X"} icon={<TwitterLogoIcon />} />
                                    <DailyTask checked={questAction.has(1)} point={"50"} done={"Joined"} todo={"Join"} link={"https://t.me/memolabsio"} updateFunc={() => finishTask(51, 50, "Join Memo TG Claim Success", "Please confirm that you have joined MEMO telegram")} text={"Join MemoLabs On TG"} icon={<TelegramLogoIconBW />} />
                                    <DailyTask checked={questAction.has(2)} point={"50"} done={"Joined"} todo={"Join"} link={'https://discord.com/invite/YG4Ydv2E7X'} updateFunc={() => finishTask(52, 50, "Join Memo Discord Claim Success", "Please confirm that you have joined MEMO discord")} text={"Join MemoLabs On Discord"} icon={<DiscordLogoIcon />} />

                                    {
                                        params.channel && params.channel == "roam" ?
                                            <>
                                                <DailyTask checked={questAction.has(3)} point={"50"} done={"Followed"} todo={"Follow"} link={"https://x.com/MemoLabsOrg"} updateFunc={() => finishTask(50, 50, "Follow Roam X Claim Success", "Please confirm that you have followed Roam X")} text={"Follow Roam On X"} icon={<TwitterLogoIcon />} />
                                                <DailyTask checked={questAction.has(4)} point={"50"} done={"Joined"} todo={"Join"} link={"https://t.me/memolabsio"} updateFunc={() => finishTask(51, 50, "Join Roam TG Claim Success", "Please confirm that you have joined Roam telegram")} text={"Join Roam On TG"} icon={<TelegramLogoIconBW />} />
                                                <DailyTask checked={questAction.has(5)} point={"50"} done={"Joined"} todo={"Join"} link={'https://discord.com/invite/YG4Ydv2E7X'} updateFunc={() => finishTask(52, 50, "Join Roam Discord Claim Success", "Please confirm that you have joined Roam discord")} text={"Join Roam On Discord"} icon={<DiscordLogoIcon />} />
                                            </> :
                                            <></>
                                    }
                                </div >
                            </div >
                        </div>
                    )
                }
            </div >
            <Footer active={"earning"} />
        </>
    )
}