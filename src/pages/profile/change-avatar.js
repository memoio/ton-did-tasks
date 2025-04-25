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
    const [isSuccess, setIsSuccess] = useState(true)

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
                <SubHeaderTri title={"Change Avatar"} />

                <div className="flex flex-col gap-4 mt-6">
                    <label for="file" className="text-black text-lg dark:text-white">Choose from my gallery</label>
                    <div className="relative border border-dashed border-dao-green w-full h-24">
                        <input name="file" type="file" className="absolute inset-0 z-10 opacity-0" />
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" className="fill-dao-yellow size-8 absolute top-1/2 -translate-y-1/2 inset-x-0 mx-auto"><path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/></svg>
                    </div>
                    <button className="bg-dao-green w-full p-2 text-white rounded-full">Submit</button>
                </div>
            </div>
        </>
    )
}