import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { BasilArrowUp } from "./icons"

export function AlertCard({ image, title, text, action, size, closeFunc, btn }) {
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
                        {btn && <button onClick={closeFunc} className="bg-dao-green mt-4 min-w-full px-8 py-2 rounded-full text-white dark:bg-transparent dark:border-y-2 dark:border-solid dark:border-dao-green">{btn}</button>}
                    </>}
                </div>
            </div>
        </div>
    )
}

export function HomeDoubleCard({ icon, text, link, amount, shift, sze }) {
    return (
        <div className="bg-main-blue/10 p-4 py-3 border border-solid border-main-blue/20 flex flex-col gap-1 rounded-xl dark:bg-sec-bg dark:border-none">
            <div className="hidden -ml-1"></div>
            <div className="flex items-center gap-1 dark:fill-dao-green">
                <Image src={icon} width={18} height={18} alt="" />
                <p className="text-dao-gray text-base truncate w-4/5 dark:text-white">{text}</p>
            </div>
            <div className="flex w-full justify-between">
                <p className="font-bold text-black dark:text-white">{amount}</p>
                <Link href={link}><BasilArrowUp /></Link>
            </div>
        </div>
    )
}

export function HomeTripleCard({ icon, title, text, status, link, amount, funcAction }) {
    return (
        <div className="bg-main-blue/10 border border-solid border-main-blue/20 dark:bg-sec-bg dark:border-none p-4 py-3 flex justify-between gap-1 rounded-xl">
            <div className="">
                <div className="flex flex-row justify-start gap-1">
                    <Image src={icon} width={22} height={22} alt="" />
                    <p className="text-dao-gray capitalize">{title}</p>
                </div>
                <p className="font-semibold text-black text-lg dark:text-white">{amount}</p>
            </div>
            {link ? <Link href={link} className="bg-dao-green w-[80px] text-white px-3 py-1.5 h-fit min-w-8 rounded-full dark:bg-transparent dark:border-y-2 dark:border-solid dark:border-dao-green dark:text-white">{text}</Link> : <></>}
            {funcAction && <button disabled={status} onClick={funcAction} className={`${status ? "bg-light-green" : "bg-[#00B66C]"} w-[80px] text-white px-3 py-1.5 h-fit min-w-8 rounded-full dark:bg-transparent dark:border-y-2 dark:border-solid dark:border-dao-green dark:text-white`}>{status ? "Claimed" : "Claim"}</button>}
        </div >
    )
}


export function CheckInCard({ day, status, checkInFunc }) {
    return (
        <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-2 rounded-lg flex flex-col items-center gap-2 dark:bg-fill-bright/19 dark:border-white/6 dark:border-2">
            <p className="font-semibold text-black dark:text-white">+20</p>
            {status == 1 && <div className="size-6 border border-solid border-dao-green rounded-full flex items-center justify-center"><Image src={"/check.svg"} className="w-3" width={6} height={5} alt="" /></div>}
            {status == 0 && <div className="size-6 border border-solid border-dao-yellow rounded-full flex items-center justify-center"><Image src={"/material-symbols-light_lock-outline.svg"} className="w-4" width={10} height={10} alt="" /></div>}
            {status == 2 && <button onClick={checkInFunc} className="bg-dao-green text-[10px] text-white p-1 w-full rounded">Check</button>}

            <p className="text-dao-gray text-sm dark:text-light-gray">Day {day}</p>
        </div>
    )
}

export function LinkTask({ icon, text, loginFunc, updateFunc, checked }) {
    const [clickLink, setClickLink] = useState(false);

    const handleLink = async () => {
        await loginFunc();

        setClickLink(true);
    }

    const handleClaim = () => {
        updateFunc();

        setClickLink(false);
    }

    return (
        <div className="flex justify-between gap-4 max-w-full">
            <div className="flex gap-2 w-3/4">
                <div className="border border-solid border-white dark:border-fill-bright/19 rounded h-fit">{icon}</div>
                <div className="">
                    <p className="text-dao-gray line-clamp-1">{text}</p>
                    <p className="text-dao-green font-semibold text-sm">+100</p>
                </div>
            </div>

            {clickLink && <button onClick={handleClaim} className={`button_primary h-fit rounded-full text-white min-w-16 text-sm`}>claim</button>}
            {!clickLink && <button disabled={checked} onClick={handleLink} className={`${checked ? "button_done" : "button_primary"} h-fit rounded-full text-white min-w-16 text-sm`}>{checked ? "linked" : "link"}</button>}
        </div>
    )
}

export function DailyTask({ icon, text, link, point, updateFunc, checked, todo, done }) {
    const [clickLink, setClickLink] = useState(false);

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

    const handleClaim = () => {
        updateFunc();

        setClickLink(false);
    }

    return (
        <div className="flex justify-between gap-4 max-w-full">
            <div className="flex gap-2 w-3/4">
                <div className="border border-solid border-white dark:border-fill-bright/19 rounded h-fit">{icon}</div>
                <div className="">
                    <p className="text-dao-gray line-clamp-1">{text}</p>
                    <p className="text-dao-green font-semibold text-sm">+{point ? point : "20"}</p>
                </div>
            </div>

            {clickLink && <button onClick={handleClaim} className={`button_primary h-fit rounded-full text-white min-w-16 text-sm`}>claim</button>}
            {!clickLink && <button disabled={checked} onClick={handleLink} className={`${checked ? "button_done" : "button_primary"} h-fit rounded-full text-white min-w-16 text-sm`}>{checked ? done : todo}</button>}
        </div>
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
                <Image src={"/aaFrame.svg"} width={16} height={16} /> :
                <button onClick={handleFunc} className="bg-dao-yellow px-2 py-1 text-sm border-2 border-solid border-white rounded text-[10px]">+ Add</button>
            }
        </div>
    )
}

export function Pagination({ currentPage, totalPages, onPageChange }) {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 2;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-[#05F292] text-black' : 'bg-[#05F29220]'
                        }`}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pageNumbers.push(<span className="page-link">...</span>);
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            pageNumbers.push(
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-[#05F292] text-black' : 'bg-[#05F29220]'
                        }`}
                >
                    {page}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<span>...</span>);
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-[#05F292] text-black' : 'bg-[#05F29220]'
                        }`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-6 gap-2">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-[#05F29220] disabled:opacity-50"
            >
                Prev
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-[#05F29220] disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export function LeaderboardCard({ name, point, count }) {
    return (
        <div className="bg-main-blue/8 border border-solid border-main-blue/21 rounded-lg p-4 flex justify-between items-center dark:bg-sec-bg dark:border-none">
            <div className="flex gap-2">
                <Image src={"/Ellipse 224.png"} width={43} height={43} alt="" />
                <div className="flex flex-col justify-center">
                    <p className="leading-tight text-sm font-semibold text-dark-bg dark:text-white">{name}</p>
                </div >
            </div >

            <p className="font-semibold text-sm text-dark-bg dark:text-white">{point} Points</p>
            <p className="bg-dao-yellow size-6 text-white flex items-center justify-center rounded-full text-sm dark:bg-dao-yellow/15 dark:text-dao-yellow">{count}</p>
        </div >
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