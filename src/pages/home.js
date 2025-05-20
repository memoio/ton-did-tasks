import { AlertCard, HomeDoubleCard, HomeTripleCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import { Dark, Light } from "@/components/icons";
import { useAction } from "@/context/ActionContext";
import { useAuth } from "@/context/AuthContext";
import { useDIDInfo } from "@/context/DIDContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [failedText, setFailedText] = useState("");

    const router = useRouter();
    const { didInfo } = useDIDInfo();
    const { userInfo, userProfile, address, addPoint } = useAuth();
    const { dailyAction, setDaily, finishDailyCheck } = useAction();
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

    const toggleTheme = () => {
        const root = document.documentElement;
        const newTheme = !isDark;
        root.classList.toggle('dark', newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        setIsDark(newTheme);
    };


    const closeFunc = () => {
        setIsVisible(false)
        setIsFailed(true);
    }

    const finishDailyTask = async () => {
        const url = "https://x.com/MemoLabsOrg";
        if (didInfo.exist && address) {
            if (window.Telegram?.WebApp?.openTelegramLink) {
                window.Telegram.WebApp.openTelegramLink(url);
            }
            else {
                window.open(url, '_blank');
            }

            try {
                await recordAdd(address, 70);
                addPoint(20);
                setDaily(action - 70);
                finishDailyCheck();
                setIsVisible(true);
            } catch (err) {
                setFailedText(err.message);
                setIsFailed(true);
            }
        } else {
            setFailedText("Please Create DID First");
            setIsFailed(true);
        }
    }

    return (
        <>
            {/* {!didInfo.exist && !checked && <AlertCard image={"/Frame 34643.svg"} title={"Notice"} text={"Please Create DID First!"} size={87} closeFunc={closeFunc} btn={"Ok"} />} */}
            {isVisible && <AlertCard image={"/Frame 34643-celeb.svg"} title={`+20 Points`} text={"Daily check success"} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={'Failed'} text={failedText} size={87} closeFunc={closeFunc} btn={"Ok"} />}

            <div className="flex flex-col gap-4 p-8 pb-28">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 w-fit items-center">
                        <Image src={"/Frame 34635.png"} className="aspect-auto object-contain" width={41} height={40} alt="" />
                        <div className="flex flex-col gap-0 relative top-0.5">
                            <p className="font-semibold text-dark-bg text-xl leading-4 dark:text-white">{userProfile.name}</p>
                            <p className="text-dao-gray">{didInfo.Exist ? `${didInfo.did.slice(0, 12)}...${didInfo.did.slice(71)}` : `${address?.slice(0, 6)}...${address?.slice(38)}`}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <button onClick={toggleTheme} className="p-1 rounded-full bg-main-blue/23 dark:bg-sec-bg size-9 flex items-center justify-center">{isDark ? <Light /> : <Dark />}</button>
                        <Link href={"/message"}><Image src={"/mynaui_bell.svg"} className="bg-main-blue/23 dark:bg-sec-bg rounded-full size-9" width={36} height={36} alt="" /></Link>
                    </div>
                </div>

                <Link href={"/tge-pad"}><Image src={"/Frame 34619.png"} className="bg-dao-green rounded" width={393} height={117} alt="" /></Link>

                <div className="grid grid-cols-2 gap-4">
                    <HomeDoubleCard text={"Total Points"} amount={userInfo.points} icon={"/mdi_star-four-points-outline.svg"} link={"/points-details"} sze={22} shift={1} />
                    <HomeDoubleCard text={"Referral Made"} amount={userInfo.inviteCount} icon={"/mdi_star-four-points-outline-xx.svg"} sze={18} link={"/invitation-details"} />
                </div>

                <div className="flex flex-col gap-4">
                    <HomeTripleCard icon={"/mdi_star-four-points-circle-outline.svg"} title={"Points Earned Today"} amount={1000} text={"Check"} link={"/points-details"} />
                    <HomeTripleCard icon={"/uil_calender.svg"} title={"Streak Check-In"} amount={20} text={"Claim"} done={"Claimed"} status={dailyAction.has(0)} funcAction={finishDailyTask} />
                    <HomeTripleCard icon={"/fa6-solid_ranking-star.svg"} title={"My Global Rank"} amount={1000} text={"Check"} link={"/leaderboard"} />
                </div>

                <div className="bg-main-blue/10 p-4 py-3 border border-solid border-main-blue/20 flex flex-col justify-between gap-1 rounded-xl dark:bg-sec-bg dark:border-none">
                    <div className="flex gap-2">
                        <Image src={"/fluent_people-community-16-regular.svg"} width={20} height={20} alt="" />
                        <h2 className="text-dao-gray dark:text-white">Connect With Community</h2>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <Link href={"https://x.com/MemoLabsOrg"} target={"_blank"} className="text-xs flex flex-col gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" className="fill-dark-bg border border-solid border-black p-1.5 rounded size-10 dark:fill-white dark:border-light-green/19" xmlns="http://www.w3.org/2000/svg"><path d="M17.6863 3.0625L12.6903 8.7735L8.37033 3.0625H2.11133L9.58833 12.8385L2.50233 20.9375H5.53633L11.0053 14.6875L15.7853 20.9375H21.8873L14.0933 10.6335L20.7183 3.0625H17.6863ZM16.6223 19.1225L5.65333 4.7815H7.45633L18.3023 19.1215L16.6223 19.1225Z" /></svg> Twitter</Link>
                        <Link href={"https://t.me/memolabsio"} target={"_blank"} className="text-xs flex flex-col gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" className="fill-dark-bg border border-solid border-black p-1.5 rounded size-10 dark:fill-white dark:border-light-green/19" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.4839 19.7902V19.7882L18.5019 19.7452L21.5009 4.62518V4.57718C21.5009 4.20018 21.3609 3.87118 21.0589 3.67418C20.7939 3.50118 20.4889 3.48918 20.2749 3.50518C20.0758 3.52335 19.8792 3.5636 19.6889 3.62518C19.6077 3.65109 19.5277 3.68045 19.4489 3.71318L19.4359 3.71818L2.71595 10.2772L2.71095 10.2792C2.65972 10.2955 2.60989 10.3159 2.56195 10.3402C2.4431 10.3937 2.32902 10.4573 2.22095 10.5302C2.00595 10.6782 1.59695 11.0262 1.66595 11.5782C1.72295 12.0362 2.03795 12.3262 2.25095 12.4772C2.37639 12.5657 2.51161 12.6396 2.65395 12.6972L2.68595 12.7112L2.69595 12.7142L2.70295 12.7172L5.62895 13.7022C5.61828 13.8862 5.63728 14.0712 5.68595 14.2572L7.15095 19.8162C7.23098 20.1192 7.40392 20.3895 7.64547 20.5892C7.88702 20.7889 8.18506 20.9079 8.49772 20.9296C8.81039 20.9512 9.12197 20.8743 9.38871 20.7098C9.65546 20.5453 9.86396 20.3013 9.98495 20.0122L12.2729 17.5662L16.2019 20.5782L16.2579 20.6022C16.6149 20.7582 16.9479 20.8072 17.2529 20.7662C17.5579 20.7242 17.7999 20.5962 17.9819 20.4512C18.1925 20.2806 18.3603 20.0631 18.4719 19.8162L18.4799 19.7992L18.4829 19.7932L18.4839 19.7902ZM7.13595 13.8752C7.11972 13.8135 7.12358 13.7483 7.14696 13.6889C7.17033 13.6296 7.21201 13.5792 7.26595 13.5452L17.1869 7.24518C17.1869 7.24518 17.7709 6.89018 17.7499 7.24518C17.7499 7.24518 17.8539 7.30718 17.5409 7.59818C17.2449 7.87518 10.4699 14.4162 9.78395 15.0782C9.74672 15.1159 9.72015 15.1628 9.70695 15.2142L8.60095 19.4342L7.13595 13.8752Z" /></svg> Telegram</Link>
                        <Link href={"https://discord.com/invite/YG4Ydv2E7X"} target={"_blank"} className="text-xs flex flex-col gap-1 items-center"><svg width="20" height="20" viewBox="0 0 20 20" className="fill-dark-bg border border-solid border-black p-1.5 rounded size-10 dark:fill-white dark:border-light-green/19" xmlns="http://www.w3.org/2000/svg"><path d="M16.0588 4.44036C14.9504 3.9237 13.7504 3.5487 12.5004 3.33203C12.4784 3.33234 12.4575 3.34133 12.4421 3.35703C12.2921 3.63203 12.1171 3.99036 12.0004 4.26536C10.6746 4.06549 9.32627 4.06549 8.00042 4.26536C7.88376 3.98203 7.70876 3.63203 7.55042 3.35703C7.54209 3.34036 7.51709 3.33203 7.49209 3.33203C6.24209 3.5487 5.05042 3.9237 3.93376 4.44036C3.92542 4.44036 3.91709 4.4487 3.90876 4.45703C1.64209 7.8487 1.01709 11.1487 1.32542 14.4154C1.32542 14.432 1.33376 14.4487 1.35042 14.457C2.85042 15.557 4.29209 16.2237 5.71709 16.6654C5.74209 16.6737 5.76709 16.6654 5.77542 16.6487C6.10876 16.1904 6.40876 15.707 6.66709 15.1987C6.68376 15.1654 6.66709 15.132 6.63376 15.1237C6.15876 14.9404 5.70876 14.7237 5.26709 14.4737C5.23376 14.457 5.23376 14.407 5.25876 14.382C5.35042 14.3154 5.44209 14.2404 5.53376 14.1737C5.55042 14.157 5.57542 14.157 5.59209 14.1654C8.45876 15.4737 11.5504 15.4737 14.3838 14.1654C14.4004 14.157 14.4254 14.157 14.4421 14.1737C14.5338 14.2487 14.6254 14.3154 14.7171 14.3904C14.7504 14.4154 14.7504 14.4654 14.7088 14.482C14.2754 14.7404 13.8171 14.9487 13.3421 15.132C13.3088 15.1404 13.3004 15.182 13.3088 15.207C13.5754 15.7154 13.8754 16.1987 14.2004 16.657C14.2254 16.6654 14.2504 16.6737 14.2754 16.6654C15.7088 16.2237 17.1504 15.557 18.6504 14.457C18.6671 14.4487 18.6754 14.432 18.6754 14.4154C19.0421 10.6404 18.0671 7.36536 16.0921 4.45703C16.0838 4.4487 16.0754 4.44036 16.0588 4.44036ZM7.10042 12.4237C6.24209 12.4237 5.52542 11.632 5.52542 10.657C5.52542 9.68203 6.22542 8.89037 7.10042 8.89037C7.98376 8.89037 8.68376 9.69037 8.67542 10.657C8.67542 11.632 7.97542 12.4237 7.10042 12.4237ZM12.9088 12.4237C12.0504 12.4237 11.3338 11.632 11.3338 10.657C11.3338 9.68203 12.0338 8.89037 12.9088 8.89037C13.7921 8.89037 14.4921 9.69037 14.4838 10.657C14.4838 11.632 13.7921 12.4237 12.9088 12.4237Z" /></svg> Discord</Link>
                        <Link href={"https://memolabs.medium.com/"} target={"_blank"} className="text-xs flex flex-col gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" className="fill-dark-bg border border-solid border-black p-1.5 rounded size-10 dark:fill-white dark:border-light-green/19" xmlns="http://www.w3.org/2000/svg"><path d="M8 6C9.5913 6 11.1174 6.63214 12.2426 7.75736C13.3679 8.88258 14 10.4087 14 12C14 13.5913 13.3679 15.1174 12.2426 16.2426C11.1174 17.3679 9.5913 18 8 18C6.4087 18 4.88258 17.3679 3.75736 16.2426C2.63214 15.1174 2 13.5913 2 12C2 10.4087 2.63214 8.88258 3.75736 7.75736C4.88258 6.63214 6.4087 6 8 6ZM17 7C18.5 7 19.5 9.239 19.5 12C19.5 14.761 18.5 17 17 17C15.5 17 14.5 14.761 14.5 12C14.5 9.239 15.5 7 17 7ZM21 7.5C21.38 7.5 21.712 8.327 21.88 9.746L21.927 10.189L21.946 10.424L21.976 10.918L21.986 11.177L21.998 11.718L22 12L21.998 12.282L21.986 12.823L21.976 13.083L21.946 13.576L21.926 13.811L21.881 14.254C21.712 15.674 21.381 16.5 21 16.5C20.62 16.5 20.288 15.673 20.12 14.254L20.073 13.811L20.054 13.576L20.024 13.082L20.014 12.823L20.002 12.282V11.718L20.014 11.177L20.024 10.917L20.054 10.424L20.074 10.189L20.119 9.746C20.288 8.326 20.619 7.5 21 7.5Z" /></svg> Medium</Link>
                        <Link href={"https://data.memolabs.org/"} target={"_blank"} className="text-xs flex flex-col gap-1 items-center"><svg width="24" height="24" viewBox="0 0 24 24" className="fill-main-blue/8 border border-solid border-black p-1.5 rounded size-10 dark:fill-white dark:border-light-green/19 stroke-dark-bg" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3M12 21C14.761 21 15.941 15.837 15.941 12C15.941 8.163 14.761 3 12 3M12 21C9.239 21 8.059 15.837 8.059 12C8.059 8.163 9.239 3 12 3M3.5 9H20.5M3.5 15H20.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg> Website</Link>
                    </div>
                </div>
            </div>

            <Footer active="home" />
        </>
    )
}