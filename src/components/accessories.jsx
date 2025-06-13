import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowRightGreen, CopyIcon } from "./icons";
import { sendEmailCode, bindEmail } from "@/components/api/profile";


export function SubHeader({ title }) {
    const router = useRouter()

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-black z-50 px-4 py-4 flex justify-between gap-10 border-b border-gray-200 dark:border-gray-800">
            <button onClick={() => router.back()} className=""><Image src={"/arrow-Vector.svg"} className="w-4" width={14} height={19} alt="" /></button>
            <h1 className="text-xl font-semibold text-black text-center dark:text-white">{title}</h1>
            <button className="invisible"><Image src={"/arrow-Vector.svg"} width={14} height={19} alt="" /></button>
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
                    {address ? <p className="text-dark-stroke dark:text-white font-semibold -mt-1 flex items-center gap-2">{`${address.slice(0, 6)}...${address.slice(address.length - 4)}`} <button onClick={() => copyToClipboard(address)} className=""><Image src={isCopied ? "/check.svg" : "/copy-icon.svg"} width={16} height={16} alt="" /></button></p> : <p className="text-dark-stroke dark:text-white font-semibold -mt-1">Add Address</p>}
                </div>
            </div>
            <Link href={`/add-address/${title}`}><ArrowRight /></Link>
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
        <div className="py-4 border-b-1 dark:border-b-2 border-solid border-light-stroke flex justify-between items-center dark:border-white/6">
            <div className="">
                <p className="text-black font-semibold dark:text-white">{title}</p>
                <p className="text-dao-gray dark:text-light-gray dark:font-normal">{date}</p>
            </div >
            <p className="text-black font-semibold dark:text-white">+{amount}</p>
        </div >
    )
}


export function InvitationDetails({ name, timestamp, address, did }) {
    return (
        <div>
            <div className="bg-main-blue/10 dark:bg-sec-bg border border-solid border-main-blue/20 dark:border-0 rounded-[10px] p-4 flex justify-between">
                <div className="">
                    <p className="font-semibold dark:text-white">{name ? name : `${address.slice(0, 6)}...${address.length === 42 ? address.slice(38) : address.slice(42)}`}</p>
                    <p className="flex gap-1 text-sm dark:text-light-gray">{`${address.slice(0, 6)}...${address.length === 42 ? address.slice(38) : address.slice(42)}`}</p>
                </div>
                <div className="w-fit">
                    <p className="text-xs dark:text-light-gray">{timestamp}</p>
                    <p className="flex gap-1 text-sm mt-2 dark:text-light-gray">{did ? <Image src={"/ion_checkbox-outline.svg"} width={16} height={16} alt={" "} /> : <Image src={"/ion_checkbox-outline-null.svg"} width={16} height={16} alt={""} />}Create DID</p>
                </div>
            </div>
        </div>
    )
}



export function MessageList({ image, title, message, timestamp, isClamp }) {
    const msg = useRef(null)

    useEffect(() => {
        isClamp == false && msg.current.classList.remove('line-clamp-2')
    }, [isClamp])

    return (
        <div className="bg-main-blue/8 border border-solid border-main-blue/21 rounded-lg p-4 dark:bg-sec-bg dark:border-none">
            <div className="flex gap-2">
                <Image className="w-[43px] h-[43px]" src={image} width={43} height={43} alt="" />
                <div className="">
                    <p className="font-semibold text-black dark:text-white">{title}</p>
                    <p className="text-sm text-black dark:text-white">{timestamp}</p>
                </div>
            </div>
            <p ref={msg} className="line-clamp-2 text-dao-gray mt-2">{message}</p>
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

export default function EmailBindModal({ address, onClose, onSuccess }) {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSendCode = async () => {
        if (!email) return setMsg("Please enter your email.");
        setLoading(true);
        try {
            await sendEmailCode(email);
            setStep(2);
            setMsg("Code sent.");
        } catch (err) {
            setMsg(err.message || "Send failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleBind = async () => {
        if (!code) return setMsg("Please enter code.");
        setLoading(true);
        try {
            await bindEmail(address, email, code);
            setMsg("Email bound!");
            onSuccess?.();
            onClose();
        } catch (err) {
            setMsg(err.message || "Bind failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
            <div className="bg-white dark:bg-sec-bg rounded-xl p-6 w-80 space-y-4 shadow-lg">
                <h2 className="text-lg font-semibold text-center">Bind Email</h2>

                <input
                    type="email"
                    placeholder="Email"
                    disabled={step === 2}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded dark:bg-black border-main-blue/30 dark:border-dark-stroke"
                />

                {step === 2 && (
                    <input
                        type="text"
                        placeholder="Verification Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full px-3 py-2 border rounded dark:bg-black border-main-blue/30 dark:border-dark-stroke"
                    />
                )}

                {msg && <p className="text-sm text-center text-dao-green">{msg}</p>}

                <div className="flex gap-2">
                    <button onClick={onClose} className="w-1/2 border py-2 rounded dark:border-dark-stroke">Cancel</button>
                    <button
                        onClick={step === 1 ? handleSendCode : handleBind}
                        disabled={loading}
                        className="w-1/2 bg-dao-green text-white py-2 rounded disabled:opacity-60"
                    >
                        {loading ? "..." : step === 1 ? "Send Code" : "Bind"}
                    </button>
                </div>
            </div>
        </div>
    );
}
