import { SubHeader } from "@/components/accessories";
import { AlertCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import { useDIDInfo } from "@/context/DIDContext";
import { bindEXInfo } from "@/components/api/profile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTGE } from "@/context/TGEContext";

export default function AddAddress() {
    const router = useRouter();
    const { page } = router.query;
    const [isVisible, setIsVisible] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isNotSupport, setIsNotSupport] = useState(false);
    const [failedText, setFailedText] = useState(false);
    const { didInfo } = useDIDInfo();
    const { addTGEInfo } = useTGE();

    const [info, setInfo] = useState({
        address: '',
        uid: ''
    });

    const closeFunc = () => {
        setIsVisible(false)
        setIsFailed(false)
        setIsNotSupport(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const checkAddress = (address) => {
        return /^0x[0-9A-Fa-f]+$/.test(address);
    }

    const checkUid = (uid, tgeName) => {
        return true;
    }

    const handleAddEX = async () => {
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

        if (!checkAddress(info.address) || !checkUid(info.uid, page)) {
            setFailedText("Please enter the correct address and uid.");
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

    return (
        <>
            {isVisible && <AlertCard image={"/Clip path group-check.svg"} title={"Add Successful"} size={87} closeFunc={closeFunc} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Add Failed"} text={failedText} size={87} closeFunc={closeFunc} />}
            {isNotSupport && <AlertCard image={"/Frame 34643-x.svg"} title={`Not Support: ${page}`} text={failedText} size={87} closeFunc={closeFunc} />}

            <div className="px-8 py-4 flex flex-col gap-4 pb-28">
                <SubHeader title={"Add Address"} />

                <div className="bg-dao-green rounded-lg p-4 relative flex justify-between items-center text-white dark:text-light-gray dark:bg-sec-bg">
                    <div className="absolute inset-0 bg-black/20"></div>

                    <div className="flex gap-2 items-center relative z-10">
                        <Image src={`/${page}.svg`} width={42} height={42} alt="" />
                        <p className="">{page}</p>
                    </div>
                    <Link className="relative z-10" href={`/how-to-register/${page}`}>How To Register</Link>
                </div>

                <button onClick={handleRegister} className="bg-dao-green rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green w-full py-3 text-center text-white">Register Now</button>
                {/* <button onClick={handleRegister} className="relative z-10" href={`/how-to-register/${page}`}>How To Register</button> */}
                {/* <form className="text flex flex-col gap-4 mt-4" onSubmit={handleAddEX}> */}
                <div className="flex flex-col gap-1">
                    <label for="address" className="text-black dark:text-white">Wallet Address</label>
                    <input onChange={handleChange} name="address" type="text" className="bg-main-blue/8 dark:bg-sec-bg text-dao-gray placeholder:text-dao-gray dark:text-white border border-solid border-main-blue/20 dark:border-none px-4 py-3 rounded-lg" placeholder={`Input ${page} ETH Address`} />
                </div>
                <div className="flex flex-col gap-1">
                    <label for="uid" className="text-black dark:text-white">UID</label>
                    <input onChange={handleChange} name="uid" type="text" className="bg-main-blue/8 dark:bg-sec-bg text-dao-gray placeholder:text-dao-gray dark:text-white border border-solid border-main-blue/20 dark:border-none px-4 py-3 rounded-lg" placeholder={`Input ${page} account UID`} />
                </div>

                <button onClick={handleAddEX} className="bg-dao-green rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green w-full py-3 text-center text-white">Confirm</button>
                {/* </form> */}
            </div>

            <Footer active="home" />
        </>
    )
}