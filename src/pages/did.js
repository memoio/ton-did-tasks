import { DidMint } from "@/components/accessories";
import { AlertCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home () {
    const [isVisible, setIsVisible] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const [isDid, setIsDid] = useState(true) //Toggle
    const [address, setAddress] = useState('did:memo:74a10356eecd185b510a0173e9c4638c6bbd15b107fbb772203a2664fe980ecbf')

    const router = useRouter();

    const copyToClipboard = (text) => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text)
              .then(() => pcFunc('flex'))
              .catch(() => copyToClipboardFallback());
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
    };

    const closeFunc = () => {
        if ( isVisible || isFailed || isSuccess ) {
            setIsVisible(false)
            setIsFailed(false)
            setIsSuccess(false)
        } else {
            setIsVisible(true)
            setIsFailed(true)
            setIsSuccess(true)
        }
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

    const createDidFX = () => {
        setIsVisible(true)

        setTimeout(() => {
            setIsVisible(false)
        }, 2000)

        setTimeout(() => {
            setIsSuccess(true)
        }, 2000)

        setTimeout(() => {
            setIsSuccess(false)
        }, 3000)
    }

    return (
        <>
            { isVisible && <AlertCard image={"/Frame 34643-hg.png"} title={"Waiting..."} text={"DID is being created, please wait patiently!"} size={87} closeFunc={ closeFunc } /> }
            { isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Failed"} text={"DID creation failed, you may need to try again!"} size={87} closeFunc={ closeFunc } btn={"Try Again"} /> }
            { isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"Success"} text={"DID was successfully created, go do the tasks and earn rewards!"} size={87} closeFunc={ closeFunc } btn={"Ok"} /> }
            
            <div className="flex flex-col gap-4 p-8 pb-32">
                <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-8 flex flex-col items-center justify-center text-center gap-2 rounded-2xl dark:bg-sec-bg dark:border-none">
                    <Image src={"/Frame 34643-dp.png"} className="mx-auto" width={89} height={89} alt="" />
                    <h2 className="text-dao-yellow text-2xl font-semibold">Data DID</h2>
                    <p className="text-xs text-dao-gray dark:text-white">Your all–in–one, privacy–preserving self–sovereign identity. Own, manage, and monetize your data!</p>
                </div>

                { isDid?
                <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-4 flex flex-col gap-2 rounded-2xl dark:bg-sec-bg dark:border-none">
                    <h2 className="text-black font-bold dark:text-white">No. 116266</h2>
                    <div className="w-full flex justify-between gap-2 -mt-2">
                        <p className="text-dao-gray break-all dark:text-light-gray">{ shortener(address) }</p>
                        <button onClick={ () => copyToClipboard("did:memo:74a10356eecd185b510a0173e9c4638c6bbd15b107fbb772203a2664fe980ecbf ")} className="min-w-6 max-w-6 flex justify-end"><Image src={"/icons_copy.svg"} width={28} height={28} alt="" /></button>
                    </div>
                </div>:


                <div className="flex flex-col">
                    <DidMint title={"Network"} text={"Polygon"} />
                    <DidMint title={"Mint To"} text={"0xb188...hn552e"} />
                    <DidMint title={"Pay With"} text={"0.0 memo"} />
                    <DidMint title={"Total"} text={"0.0 memo+0.0 gas"} />

                    <button onClick={ createDidFX } className="py-2 bg-dao-green text-white rounded-full border-y-2 border-solid mt-4 dark:bg-sec-bg dark:border-dao-green">Create</button>
                    <p className="italic text-center leading-tight mt-4 text-sm text-light-gray">Note: At this stage, the cost of creating DID is borne by MEMO</p>
                </div>
                }



            </div>
            <Footer active={"did"} />
        </>
    )
}