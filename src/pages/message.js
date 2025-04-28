import { Footer } from "@/components/footer";
import { InvitationDetails, LeaderboardCard, MessageList, PointsDetails, SubHeader } from "@/components/accessories";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function InvitationDetailsPage () {
    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">     
                <SubHeader title={"Message"} />

                <div className="flex flex-col gap-4">
                    { [1,2,3].map((i, key) => {
                        return (
                           <Link key={key} href={`/message/${key*1234}`}><MessageList image={"/Ellipse 204.png"} title={"aZen vs. Other DePIN Giants"} message={"1/7 Most people aren't social media experts — but in the world of Web3, your ability to navigate, communicate, and build communities online becomes a critical skill. Even if you're not a pro, understanding the landscape can set you apart, help you grow a brand, and open up real opportunities."} timestamp={"04/16/2025 08:21:10"} isClamp={true} /></Link>
                        )
                    }) }
                </div>
            </div>
        </>
    )
}