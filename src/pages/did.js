import { DidMint } from "@/components/accessories";
import { AlertCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import { useDIDInfo } from "@/context/DIDContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
// import { useAccount } from "wagmi";
import { createDIDTon } from "@/components/api/did";
import { useAction } from "@/context/ActionContext";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    // const { address } = useAccount();
    const { didInfo } = useDIDInfo();
    const { address, rawAddress, userProfile } = useAuth();
    const { finishAction } = useAction();

    const router = useRouter();

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

    const closeFunc = () => {
        setIsVisible(false)
        setIsFailed(false)
        setIsSuccess(false)
    }

    const shortener = (text) => {
        let a = ''
        let b = ''

        if (text) {
            a = text.slice(0, 12)
            b = text.slice(-4, text.length)
        }

        return (`${text}`)
    }

    const createDidFX = async () => {
        setIsVisible(true);

        try {
            await createDIDTon(rawAddress, address);
            console.log("create did success!");

            setIsVisible(false);
            setIsSuccess(true);

            finishAction(1);
        } catch (err) {
            console.log(err);
            setIsFailed(true);
        }
    }

    return (
        <>
            {isVisible && <AlertCard image={"/Frame 34643-hg.png"} title={"Waiting..."} text={"DID is being created, please wait patiently!"} size={87} closeFunc={closeFunc} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Failed"} text={"DID creation failed, you may need to try again!"} size={87} closeFunc={closeFunc} btn={"Try Again"} />}
            {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"Success"} text={"DID was successfully created, go do the tasks and earn rewards!"} size={87} closeFunc={closeFunc} btn={"Ok"} />}

            <div className="flex flex-col gap-4 px-4 pt-8 pb-32">
                <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-8 flex flex-col items-center justify-center text-center gap-2 rounded-2xl dark:bg-sec-bg dark:border-none">
                    <Image src={userProfile.avatar} className="rounded-full w-[89px] h-[89px] object-cover" width={89} height={89} alt="" />
                    <h2 className="text-dao-yellow text-2xl font-semibold">Data DID</h2>
                    <p className="text-xs text-dao-gray dark:text-white">Your all–in–one, privacy–preserving self–sovereign identity. Own, manage, and monetize your data!</p>
                </div>

                {didInfo.exist ?
                    <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-4 flex flex-col gap-2 rounded-2xl dark:bg-sec-bg dark:border-none">
                        <h2 className="text-black font-bold dark:text-white">{`No.  ${didInfo.number}`}</h2>
                        <div className="w-full flex justify-between gap-2 -mt-2">
                            <p className="text-gray break-all dark:text-light-gray">{shortener(didInfo.did)}</p>
                            <button onClick={() => copyToClipboard(didInfo.did)} className="min-w-6 max-w-6 flex justify-end"><Image src={isCopied ? "/check.svg" : "/icons_copy.svg"} width={28} height={28} alt="" /></button>
                        </div>
                    </div> :


                    <div className="flex flex-col">
                        <DidMint title={"Network"} text={"Memo"} />
                        <DidMint title={"Mint To"} text={`${address?.slice(0, 6)}...${address?.slice(42)}`} />
                        <DidMint title={"Pay With"} text={"0.0 memo"} />
                        <DidMint title={"Total"} text={"0.0 memo+0.0 gas"} />

                        <button onClick={createDidFX} className="font-semibold py-2 bg-dao-green text-white rounded-full border-y-2 border-solid mt-4 dark:bg-sec-bg dark:border-dao-green">Create</button>
                        <p className="italic text-center leading-tight mt-4 text-sm text-dao-gray">Note: At this stage, the cost of creating DID is borne by MEMO</p>
                    </div>
                }



            </div >
            <Footer active={"did"} />
        </>
    )
}