import { SubHeaderTri } from "@/components/accessories";
import { DidMint } from "@/components/accessories";
import { AlertCard, CheckInCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DailyTask } from "@/components/cards";
import { TelegramLogoIconBW, TwitterLogoIcon } from "@/components/icons";

export default function InviteCode () {
    const [isSuccess, setIsSuccess] = useState(false)

    const closeFunc = () => {
        if ( isSuccess ) {
            setIsSuccess(false)
        } else {
            setIsSuccess(true)
        }
    }

    return (
        <>
            { isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"+200 Points"} text={"Invitation code binding successful"} size={87} closeFunc={ closeFunc } btn={"Ok"} /> }
            
            <div className="px-8 py-4 flex flex-col gap-4 pb-28">
                <SubHeaderTri title={"Invite Code"} />

                <div className="flex flex-col gap-4 mt-6">
                    <label for="code" className="text-black text-lg dark:text-white">Enter your invite Code</label>
                    <input id="code" type="text" className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke placeholder:text-dao-gray px-4 py-2 rounded-[10px]" placeholder="Enter" />
                    <button onClick={ () => setIsSuccess(true) } className="bg-dao-green w-full p-2 text-white rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green">Submit</button>
                </div>
            </div>
        </>
    )
}