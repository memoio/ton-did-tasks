import { AlertCard } from "@/components/cards";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";


export default function InvitationCode () {
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState(false)
    const [isFailed, setIsFailed] = useState(false)

    const closeFunc = () => {
        if ( isSuccess || isFailed ) {
            setIsSuccess(false)
            setIsFailed(false)
        } else {
            setIsSuccess(true)
            setIsFailed(true)
        }
    }

    const okFunc = () => {
        setIsFailed(false)
        setIsSuccess(true)

        setTimeout(() => {
            router.push('/home')
        }, 1000)
    }

    return (
        <>
            { isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"+200 Points"} text={"Invitation code binding successful"} size={87} closeFunc={ closeFunc } btn={"Ok"} /> }
            { isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Failed"} text={"Please enter the correct invitation code."} size={87} closeFunc={ closeFunc } btn={"Ok"} /> }
            
            <div className="min-h-screen max-h-[svh] pt-8 px-8 text-dao-yellow dark:text-white flex flex-col gap-6">
                <h1 className="flex items-center justify-center gap-4 font-bold text-xl pt-12 text-black dark:text-white"><Image src={"/si_wallet-line.svg"} width={24} height={24} alt="" />Get a Referral Code?</h1>
                <div className="flex flex-col gap-4">
                    <input type="text" className="bg-light-fill placeholder:text-do-gray text-dao-gray text-gray px-6 py-3 rounded-xl dark:border-dark-stroke dark:bg-light-fill/5" placeholder="Enter Referral Code" />
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={ okFunc } className="bg-dao-green w-full py-2 rounded-full dark:border-y-2 dark:border-dao-green dark:bg-transparent text-white">Ok</button>
                        <button onClick={ () => setIsFailed(true) } className="bg-white border-2 border-solid border-dark-stroke text-dark-stroke w-full py-2 rounded-full dark:bg-transparent dark:border-white dark:text-white dark:border-x-0 dark:rounded-[32px]">Skip</button>
                    </div>
                    <p className="text-black dark:text-white">No Invitation Code? Go to <Link href={"#"} className="text-dao-yellow underline underline-offset-2">Telegram</Link> and <Link href={"#"} className="text-dao-yellow underline underline-offset-2">X</Link>.</p>
                </div>
            </div>
        </>
    )
}