import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";


export function SubHeader({ title }) {
    const router = useRouter()

    return (
        <nav className="flex justify-between gap-10">
            <button onClick={() => router.back()} className=""><Image src={"/arrow-Vector.svg"} className="w-4" width={14} height={19} alt="" /></button>
            <h1 className="text-xl font-semibold text-black text-center dark:text-white">{title}</h1>
            <button className="invisible"><Image src={"/arrow-Vector.svg"} width={14} height={19} alt="" /></button>
        </nav>
    )
}

export function SubHeaderTri({ title }) {
    const router = useRouter()

    return (
        <nav className="flex justify-between gap-10 items-center">
            <button onClick={() => router.back()} className=""><Image src={"/vector-bb.svg"} className="w-8" width={24} height={24} alt="" /></button>
            <h1 className="text-xl font-semibold text-black text-center dark:text-white">{title}</h1>
            <button className=""><Image src={"/mage_electricity-fill-bb.svg"} className="w-7" width={24} height={24} alt="" /></button>
        </nav>
    )
}

export function WalletAccessories({ title, image, address, name }) {
    const [isCopied, setIsCopied] = useState(false);

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
        <div className="bg-main-blue/10 dark:bg-sec-bg border border-solid border-main-blue/20  dark:border-0 flex items-center justify-between rounded-lg p-4">
            <div className="flex gap-4 items-center">
                <Image src={image} className="aspect-square object-contain" width={42} height={42} alt="" />
                <div className="flex flex-col">
                    <h2 className="text-dao-gray dark:text-light-gray">{title}</h2>
                    {address ? <p className="text-dark-stroke dark:text-white font-semibold -mt-1 flex items-center gap-2">{address} <button onClick={() => copyToClipboard(address)} className=""><Image src={isCopied ? "/check.svg" : "/copy-icon.svg"} width={16} height={16} alt="" /></button></p> : <p className="text-dark-stroke dark:text-white font-semibold -mt-1">Add Address</p>}
                </div>
            </div>
            {
                address ? <Image src={"/check.svg"} className="p-1 rounded-full size-10" rx={12} width={24} height={24} alt="" /> :
                    <Link href={`/add-address/${title}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" className="p-1 bg-main-blue/15 dark:bg-white/5 rounded-full size-10 fill-[#666666] dark:fill-white" xmlns="http://www.w3.org/2000/svg">
                            <rect x="24" width="24" height="24" rx="12" transform="rotate(90 24 0)" fill="white" fill-opacity="0.04" />
                            <path d="M12.5326 9.08936C12.4703 9.03176 12.4203 8.96231 12.3856 8.88514C12.3509 8.80797 12.3322 8.72467 12.3307 8.6402C12.3292 8.55573 12.3449 8.47182 12.3768 8.39349C12.4088 8.31516 12.4563 8.244 12.5165 8.18426C12.5768 8.12452 12.6486 8.07743 12.7276 8.04579C12.8066 8.01415 12.8913 7.99861 12.9765 8.0001C13.0617 8.00159 13.1457 8.02008 13.2236 8.05446C13.3014 8.08884 13.3715 8.13842 13.4296 8.20023L16.8144 11.5554C16.9332 11.6734 17 11.8333 17 12C17 12.1667 16.9332 12.3266 16.8144 12.4446L13.4296 15.7998C13.3715 15.8616 13.3014 15.9112 13.2236 15.9455C13.1457 15.9799 13.0617 15.9984 12.9765 15.9999C12.8913 16.0014 12.8066 15.9859 12.7276 15.9542C12.6486 15.9226 12.5768 15.8755 12.5165 15.8157C12.4563 15.756 12.4088 15.6848 12.3768 15.6065C12.3449 15.5282 12.3292 15.4443 12.3307 15.3598C12.3322 15.2753 12.3509 15.192 12.3856 15.1149C12.4203 15.0377 12.4703 14.9682 12.5326 14.9106L14.8343 12.6291L6.63465 12.6291C6.46633 12.6291 6.3049 12.5628 6.18588 12.4448C6.06686 12.3269 6 12.1668 6 12C6 11.8332 6.06686 11.6731 6.18588 11.5552C6.3049 11.4372 6.46633 11.3709 6.63465 11.3709L14.8343 11.3709L12.5326 9.08936Z" />
                        </svg>
                    </Link>
            }
        </div>
    )
}


export function RegisterCards({ icon, size }) {
    return (
        <button className="border border-solid border- dark:border-dark-stroke p-2 rounded">{icon}</button>
    )
}

export function PointsDetails({ title, date, amount }) {
    return (
        <div className="py-4 border-b border-solid border-light-stroke flex justify-between items-center dark:border-white/6">
            <div className="">
                <p className="dark:font-semibold dark:text-light-gray">{title}</p>
                <p className="font-semibold dark:font-normal">{date}</p>
            </div>
            <p className="text-dao-yellow font-semibold dark:text-white">+{amount}</p>
        </div>
    )
}


export function InvitationDetails({ name, timestamp, bind, did }) {
    return (
        <div className="bg-main-blue/10 dark:bg-sec-bg border border-solid border-main-blue/20 dark:border-0 rounded-[10px] p-4 flex justify-between">
            <div className="">
                <p className="font-semibold">{name}</p>
                <p className="flex gap-1 text-sm">{bind ? <Image src={"/ion_checkbox-outline.svg"} width={16} height={16} alt={" "} /> : <Image src={"/ion_checkbox-outline-null.svg"} width={16} height={16} alt={""} />}Bind Invitation Code</p>
            </div>
            <div className="w-fit">
                <p className="text-xs dark:text-light-gray">{timestamp}</p>
                <p className="flex gap-1 text-sm mt-2">{did ? <Image src={"/ion_checkbox-outline.svg"} width={16} height={16} alt={" "} /> : <Image src={"/ion_checkbox-outline-null.svg"} width={16} height={16} alt={""} />}Create DID</p>
            </div>
        </div>
    )
}



export function MessageList({ image, title, message, timestamp }) {
    const msg = useRef(null)

    return (
        <div onClick={() => { msg.current.classList.toggle('line-clamp-2') }} className="bg-main-blue/8 border border-solid border-main-blue/21 rounded-lg p-4 dark:bg-sec-bg dark:border-none">
            <div className="flex gap-2">
                <Image src={image} width={43} height={43} alt="" />
                <div className="">
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-black dark:text-white">{timestamp}</p>
                </div>
            </div>
            <p ref={msg} className="line-clamp-2 mt-2 dark:text-dao-gray">{message}</p>
        </div>
    )
}

export function DidMint({ title, text }) {
    return (
        <div className="flex justify-between gap-8 border-b border-solid border-light-stroke dark:border-white/6 py-4 px-4">
            <p className="text-dao-gray dark:text-light-gray">{title}</p>
            <p className="font-semibold text-black dark:text-white">{text}</p>
        </div>
    )
}