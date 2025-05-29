import { SubHeader } from "@/components/accessories";
import { AlertCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import { useDIDInfo } from "@/context/DIDContext";
import { bindEXInfo } from "@/components/api/profile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTGE } from "@/context/TGEContext";

export default function AddAddress() {
    const router = useRouter();
    const { page } = router.query;
    const [isVisible, setIsVisible] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isNotSupport, setIsNotSupport] = useState(false);
    const [failedText, setFailedText] = useState("");
    const [loading, setLoading] = useState(false);
    const { didInfo } = useDIDInfo();
    const { TGEInfo, addTGEInfo } = useTGE();

    const [info, setInfo] = useState({
        address: '',
        uid: ''
    });

    const closeFunc = () => {
        setIsVisible(false);
        setIsFailed(false);
        setIsNotSupport(false);
    }

    const closeAndReturnFunc = () => {
        setIsVisible(false);
        setIsFailed(false);
        setIsNotSupport(false);
        router.push("/tge-pad");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const checkAddress = (address) => {
        console.log(address);
        return /^0x[0-9a-fA-F]{40}$/.test(address);
    }

    const checkUid = (uid, tgeName) => {
        if (tgeName === "Binance") {
            return /^[0-9]{8,10}$/.test(uid);
        } else if (tgeName === "OKX") {
            return /^[0-9]{16,20}$/.test(uid);
        } else if (tgeName === "Gate.io") {
            return /^[0-9]+$/.test(uid);
        } else {
            return false;
        }
    }

    const handleAddEX = async () => {
        setLoading(true);
        let exname = "unkonw";
        if (page === "Binance") {
            exname = "binance";
        } else if (page === "OKX") {
            exname = "okx";
        } else if (page === "Gate.io") {
            exname = "gateio";
        } else {
            setIsNotSupport(true);
            return;
        }

        if (!checkAddress(info.address)) {
            setFailedText("Please enter the correct address");
            setIsFailed(true);
            return;
        }
        if (!checkUid(info.uid, page)) {
            setFailedText(`Please enter the correct ${page}'s uid.`);
            setIsFailed(true);
            return;
        }

        if (didInfo.exist) {
            try {
                await bindEXInfo(didInfo.did, exname, info.address, info.uid);

                addTGEInfo(exname, info.address, info.uid);
                setIsVisible(true);
            } catch (err) {
                console.log(err);
                setFailedText(err.message);
                setIsFailed(true);
            }
        } else {
            setFailedText("Please Create DID First");
            setIsFailed(true);
        }
        setLoading(false);
    }

    const handleRegister = () => {
        if (page === "Binance") {
            window.open("https://accounts.binance.com/en/register?registerChannel=&return_to=", "_blank");
        } else if (page === "OKX") {
            window.open("https://www.okx.com/account/register?action=header_register_btn", "_blank");
        } else if (page === "Gate.io") {
            window.open("https://www.gate.io/signup", "_blank");
        } else {
            setIsNotSupport(true);
        }
    }

    useEffect(() => {
        if (TGEInfo) {
            let exname = "unkonw";
            if (page === "Binance") {
                exname = "binance";
            } else if (page === "OKX") {
                exname = "okx";
            } else if (page === "Gate.io") {
                exname = "gateio";
            } else {
                setIsNotSupport(true);
                return;
            }

            if (TGEInfo[exname].bind) {
                setInfo({
                    address: TGEInfo[exname].address,
                    uid: TGEInfo[exname].uid,
                })
            }
        }
    }, [TGEInfo])

    return (
        <>
            {isVisible && <AlertCard image={"/Clip path group-check.svg"} title={"Add Successful"} text={"Bind exchange info success!"} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Add Failed"} text={failedText} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isNotSupport && <AlertCard image={"/Frame 34643-x.svg"} title={`Not Support`} text={`${page} is not support, we only support:Binance, OKX, Gate.io`} size={87} closeFunc={closeAndReturnFunc} btn={"Back"} />}

            <div className="px-4 pt-8 flex flex-col gap-4 pb-28">
                <SubHeader title={"Add Address"} />

                <div className="bg-dao-green rounded-lg p-4 relative flex justify-between items-center text-white dark:text-light-gray dark:bg-sec-bg">
                    <div className="absolute inset-0 bg-black/20"></div>

                    <div className="flex gap-2 items-center relative z-10">
                        <Image src={`/${page}.svg`} width={42} height={42} alt="" />
                        <p className="px-2">{page}</p>
                    </div>
                    <Link className="relative z-10" href={`/how-to-register/${page}`}>How To Register</Link>
                </div>

                <button onClick={handleRegister} className="button_primary text-dao-green rounded-full w-full py-3 text-center">Register Now</button>
                <div className="flex flex-col gap-1">
                    <label for="address" className="text-black dark:text-white">Wallet Address</label>
                    <input onChange={handleChange} value={info.address} name="address" type="text" className="bg-main-blue/8 dark:bg-sec-bg text-dao-gray placeholder:text-dao-gray dark:text-white border border-solid border-main-blue/20 dark:border-none px-4 py-3 rounded-lg" placeholder={`Input ${page} ETH Address`} />
                </div>
                <div className="flex flex-col gap-1">
                    <label for="uid" className="text-black dark:text-white">UID</label>
                    <input onChange={handleChange} value={info.uid} name="uid" type="text" className="bg-main-blue/8 dark:bg-sec-bg text-dao-gray placeholder:text-dao-gray dark:text-white border border-solid border-main-blue/20 dark:border-none px-4 py-3 rounded-lg" placeholder={`Input ${page} account UID`} />
                </div>

                <button onClick={handleAddEX} className="button_primary text-dao-green rounded-full w-full py-3 text-center">
                    {loading ? (
                        <svg className="animate-spin h-6 w-6 text-dao-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        'Confirm'
                    )}
                </button>
            </div>

            <Footer active="home" />
        </>
    )
}