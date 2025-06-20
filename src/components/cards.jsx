import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { BasilArrowUp, TelegramLogoIcon } from "./icons"

export function AlertCard({ image, title, text, size, closeFunc, btn }) {
    return (
        <div className="fixed inset-0 bg-black/50 p-8 z-50 flex items-center justify-center text-black dark:text-white">
            <button onClick={closeFunc} className="fixed inset-0 z-0"></button>
            <div className="w-full relative z-10 bg-white dark:bg-sec-bg px-12 py-4 rounded-2xl border border-solid dark:border-dark-stroke flex flex-col items-center text-center pb-8">
                <div className="-translate-y-14 rounded-full inset-x-0 mx-auto">
                    <Image src={image} className="rounded-full mx-auto bg-white dark:bg-sec-bg border border-solid border-light-stroke dark:border-dark-stroke" width={size} height={size} alt="" />
                </div>

                <div className="flex flex-col gap-2 -mt-10 text-center items-center">
                    <h3 className="font-bold text-2xl">{title}</h3>
                    {text && <>
                        <p className="">{text}</p>
                        {btn && <button onClick={closeFunc} className="mt-4 min-w-full px-8 py-2 rounded-full bg-transparent border-y-2 border-solid border-dao-green">{btn}</button>}
                    </>}
                </div>
            </div>
        </div>
    )
}

export function HomeDoubleCard({ icon, text, link, amount }) {
    return (
        <div className="bg-main-blue/10 p-4 py-3 border border-solid border-main-blue/20 flex flex-col gap-1 rounded-xl dark:bg-sec-bg dark:border-none">
            <div className="hidden -ml-1"></div>
            <div className="flex items-center gap-1 dark:fill-dao-green">
                <Image src={icon} width={18} height={18} alt="" />
                <p className="text-dao-gray text-base truncate w-4/5 dark:text-light-gray">{text}</p>
            </div>
            <div className="flex w-full justify-between">
                <p className="font-bold text-black dark:text-white">{amount}</p>
                <Link href={link}><BasilArrowUp /></Link>
            </div>
        </div>
    )
}

export function HomeTripleCard({ icon, disabled, title, text, status, link, amount, funcAction }) {
    return (
        <div className="bg-main-blue/10 border border-solid border-main-blue/20 dark:bg-sec-bg dark:border-none p-4 py-3 flex justify-between gap-1 rounded-xl">
            <div className="">
                <div className="flex flex-row justify-start gap-1">
                    <Image src={icon} width={22} height={22} alt="" />
                    <p className="text-dao-gray capitalize dark:text-light-gray">{title}</p>
                </div>
                <p className="font-semibold text-black text-lg dark:text-white">{amount}</p>
            </div>
            {link ? <Link disabled={disabled} href={link} className={`${disabled ? "opacity-40" : ""} button_primary text-dao-green w-[80px] h-fit rounded-full px-3 py-1.5`}>{text}</Link> : <></>}
            {/* {funcAction && <button disabled={disabled || status} onClick={funcAction} className={`${disabled ? "opacity-40" : ""} ${status ? "button_done" : "button_primary text-dao-green dark:text-white"} w-[80px] px-3 py-1.5 h-fit min-w-8 rounded-full text-sm`}>{status ? "Claimed" : "Claim"}</button>} */}
            {funcAction && <button disabled={disabled || status} onClick={funcAction} className={`${disabled ? "opacity-40" : ""} ${status ? "button_done text-white" : "button_primary text-dao-green"} w-[80px] h-fit rounded-full px-3 py-1.5`}>{status ? "Claimed" : "Claim"}</button>}
        </div >
    )
}


export function CheckInCard({ day, currentDay, status }) {
    const reward = day <= 3 ? "+10" : "+20";
    const label = day === currentDay ? "Today" : `Day ${day}`;

    const icon = status === 1
        ? "/check.svg"
        : day === 7
            ? "/gift.svg"
            : "/material-symbols-light_lock-outline.svg";

    return (
        <div className="flex flex-col items-center">
            <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-2 rounded-lg flex flex-col items-center gap-2 dark:bg-fill-bright/19 dark:border-white/6 dark:border-2">
                <p className="text-xs font-semibold text-black dark:text-white">{reward}</p>
                <div className="size-6 border border-solid border-dao-green rounded-full flex items-center justify-center my-1">
                    <Image src={icon} width={14} height={14} alt="status" />
                </div>
            </div>
            <p className="text-[10px] text-dao-gray dark:text-light-gray">{label}</p>
        </div>
    )
}

export function LinkTask({ icon, text, loginFunc, updateFunc, checked }) {
    const [clickLink, setClickLink] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLink = async () => {
        await loginFunc();

        setClickLink(true);
    }

    const handleClaim = async () => {
        setLoading(true);
        await updateFunc();
        setLoading(false);

        setClickLink(false);
    }

    return (
        <div className="flex justify-between gap-4 max-w-full">
            <div className="flex gap-2 w-3/4">
                <div className="border border-solid border-white dark:border-fill-bright/19 rounded h-fit">{icon}</div>
                <div className="">
                    <p className="text-dao-gray line-clamp-1 dark:text-light-gray">{text}</p>
                    <p className="text-dao-green font-semibold text-sm">+100</p>
                </div>
            </div>

            {clickLink && <button onClick={handleClaim} disabled={loading} className={`button_claim h-fit rounded-full text-white min-w-16 text-sm flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}>
                {loading ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Claim'
                )}
            </button>}
            {!clickLink && <button disabled={checked} onClick={handleLink} className={`${checked ? "button_done text-white" : "button_primary text-dao-green"} h-fit rounded-full min-w-16 text-sm`}>{checked ? "Linked" : "Link"}</button>}
        </div>
    )
}

export function DailyTask({ icon, text, link, point, updateFunc, checked, todo, done }) {
    const [clickLink, setClickLink] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLink = () => {
        if (window.Telegram?.WebApp?.openTelegramLink && text == "Share Referral Link to TG") {
            window.Telegram.WebApp.openTelegramLink(link);
        }
        else if (window.Telegram?.WebApp?.openLink) {
            window.Telegram.WebApp.openLink(link, '_blank');
        } else {
            window.open(link, '_blank');
        }

        setClickLink(true);
    }

    const handleClaim = async () => {
        setLoading(true);
        await updateFunc();
        setLoading(false);

        setClickLink(false);
    }

    return (
        <div className="flex justify-between gap-4 max-w-full">
            <div className="flex gap-2 w-3/4">
                <div className="border border-solid border-white dark:border-fill-bright/19 rounded h-fit">{icon}</div>
                <div className="">
                    <p className="text-dao-gray line-clamp-1 dark:text-light-gray">{text}</p>
                    <p className="text-dao-green font-semibold text-sm">+{point ? point : "20"}</p>
                </div>
            </div>

            {clickLink && <button onClick={handleClaim} disabled={loading} className={`button_claim h-fit rounded-full text-white min-w-16 text-sm flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}>
                {loading ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Claim'
                )}
            </button>}
            {!clickLink && <button disabled={checked} onClick={handleLink} className={`${checked ? "button_done text-white" : "button_primary text-dao-green"} h-fit rounded-full min-w-16 text-sm`}>{checked ? done : todo}</button>}
        </div>
    )
}

export function BindCard({ title, closeFunc, confirmFunc }) {
    const [solana, setSolana] = useState("");

    const handleChange = (e) => {
        setSolana(e.target.value);
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center text-black dark:text-white">
            <button onClick={closeFunc} className="fixed inset-0 z-0"></button>
            <div className="w-full relative z-10 bg-white dark:bg-sec-bg px-4 py-4 rounded-2xl border border-solid dark:border-dark-stroke flex flex-col items-center text-center pb-8" style={{
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: "env(safe-area-inset-bottom)"
            }}>

                <div className="flex flex-col gap-2 text-center items-center">
                    <h3 className="font-bold text-2xl">{title}</h3>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                    <label for="roamSolana" className="text-black text-lg dark:text-white">Enter your roam solana Address</label>
                    <input onChange={handleChange} id="roamSolana" type="text" className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke dark:text-white placeholder:text-dao-gray dark:placeholder:text-white px-4 py-2 rounded-[10px]" placeholder="Enter" />
                    <button onClick={() => { confirmFunc(solana) }} className="mt-4 min-w-full px-8 py-2 rounded-full bg-transparent border-y-2 border-solid border-dao-green">Confirm</button>
                </div>
            </div>
        </div>
    );
}

export function RoamCard({ icon, text, address, binded, confirmFunc }) {
    const [showModal, setShowModal] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleBindClick = () => {
        if (!binded) {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleConfirm = async (solana) => {
        await confirmFunc(solana);
        setShowModal(false);
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
            {showModal && <BindCard title="Bind Roam" confirmFunc={handleConfirm} closeFunc={closeModal} />}
            <div className="flex justify-between gap-4 max-w-full">
                <div className="flex gap-2 w-full items-center">
                    <div className="border border-solid border-white dark:border-fill-bright/19 rounded h-fit">{icon}</div>
                    <div className="flex justify-between gap-4 w-full">
                        <p className="text-dao-gray line-clamp-1 dark:text-light-gray">{text}</p>
                        {
                            binded ?
                                <div className="flex items-center gap-2">
                                    <p className="text-dao-gray line-clamp-1 dark:text-light-gray">{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</p>
                                    <button onClick={() => copyToClipboard(address)} className="min-w-6 max-w-6 flex justify-end"><Image src={isCopied ? "/check.svg" : "/icons_copy.svg"} width={20} height={20} alt="" /></button>
                                </div>
                                : <button disabled={binded} onClick={handleBindClick} className={`${binded ? "button_done text-white" : "button_primary text-dao-green"} h-fit rounded-full min-w-16 text-sm`}>{binded ? "Binded" : "Bind"}</button>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export function ReferralCard({ icon, text, points }) {
    return (
        <div className="flex justify-between gap-4 max-w-full">
            <div className="flex gap-2 w-3/4 items-start">
                <Image src={icon} className="" width={38} height={38} alt="" />
                <p className="text-dao-gray relative -top-1 dark:text-light-gray">{text}</p>
            </div>

            <p className="text-dao-green font-semibold text-sm">+{points}</p>
        </div>
    )
}


export function LinkProfileCard({ name, status, handleFunc }) {
    return (
        <div className="border-2 border-solid border-white bg-white/24 h-10 px-1.5 rounded-md flex items-center gap-4 text-white">
            <p className="text-xs">{name}</p>
            {status ?
                <Image src={"/aaFrame.svg"} width={16} height={16} alt="" /> :
                <button onClick={handleFunc} className="bg-dao-yellow px-2 py-1 text-sm border-2 border-solid border-white rounded text-[10px]">+ Add</button>
            }
        </div>
    )
}

export function LeaderboardCard({ icon, name, inviteCount, point, rank, showCrown = false, medalIcon }) {
    return (
        <div className="bg-main-blue/8 border border-solid border-main-blue/21 rounded-lg p-4 flex justify-between items-center dark:bg-sec-bg dark:border-none">
            <div className="flex gap-2 min-w-0 flex-1">
                {/* {icon + crown} */}
                <div className="relative">
                    <Image src={icon && icon !== "" ? icon : "/Ellipse 224.png"} className="rounded-full w-[43px] h-[43px] object-cover" width={43} height={43} alt="avatar" />
                    {showCrown && (<Image src="/crown-gold.svg" alt="Crown" width={24} height={24} className="absolute -top-3 left-1/2 -translate-x-1/2" />)}
                </div>

                {/* {name + medal} */}
                <div className="flex flex-col justify-center min-w-0">
                    <div className="flex items-center gap-1">
                        {medalIcon && (<Image src={medalIcon} alt="Medal" width={16} height={16} />)}
                        <p className="leading-tight text-sm font-semibold text-dark-bg dark:text-white truncate">{name !== "" ? name : "Unknown"}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 ml-auto pl-4 text-sm font-semibold text-dark-bg dark:text-white whitespace-nowrap">
                <p className="w-16 text-center">{inviteCount}</p>
                <p className="w-20 text-center">{point}</p>
                <p className="w-8 h-8 bg-dao-yellow text-white flex items-center justify-center rounded-full text-sm dark:bg-dao-yellow/15 dark:text-dao-yellow">
                    {rank}
                </p>
            </div>

        </div>
    )
}

export function ProfileCard({ title, link }) {
    return (
        <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke flex gap-4 p-4 justify-between rounded-xl">
            <p className="text-dao-gray dark:text-light-gray">{title}</p>
            <Link href={link} className=""><Image src={"/rer5tyFrame.svg"} className="" width={24} height={24} alt="" /></Link>
        </div >
    )
}

export function WalletConnectionCard({ image, name, fx, id, elState }) {
    const router = useRouter()

    const el = useRef(null)
    // const clickAction = () => {
    //     fx(id)
    //     // router.push('/invitation-code')
    // }

    return (
        <>
            {id == elState ?
                <div ref={el} onClick={fx} className="group relative w-full p-3 bg-dao-green text-white border border-solid border-light-stroke flex items-center justify-center gap-2 rounded-[10px] dark:rounded-full dark:border-none">
                    <Image src={image} width={26} height={26} alt="" />
                    <p className="text-white">{name}</p>

                    <button className="absolute right-4 top-1/2 -translate-y-1/2"><Image src={"/mage_electricity-fill-bb.svg"} className="" width={24} height={24} alt="" /></button>
                </div> :

                <div ref={el} onClick={fx} className="group relative w-full p-3 bg-light-fill border border-solid border-light-stroke flex items-center justify-center gap-2 rounded-[10px] dark:bg-sec-bg dark:rounded-full dark:border-none hover:bg-dao-green">
                    <Image src={image} width={26} height={26} alt="" />
                    <p className="text-dao-gray">{name}</p>
                </div>
            }
        </>
    )
}