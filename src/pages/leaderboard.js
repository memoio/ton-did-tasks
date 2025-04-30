import { Footer } from "@/components/footer";
import { InvitationDetails, PointsDetails, SubHeader } from "@/components/accessories";
import { useRef } from "react";
import Image from "next/image";
import { LeaderboardCard } from "@/components/cards";
import { useAuth } from "@/context/AuthContext";
import { useRank } from "@/context/RankContext";

export default function InvitationDetailsPage() {
    const weekly = useRef(null)
    const monthly = useRef(null)
    const all_time = useRef(null)

    const { userInfo } = useAuth();
    const { pagedToalRank, pagedWeeklyRank, length, weeklyLength, page, weeklyPage, setRankPage } = useRank();

    const modeList = [weekly, monthly, all_time]
    const toggleModes = (mode) => {
        for (let i = 0; i < modeList.length; i++) {
            modeList[i].current.classList.remove('text-white')
            modeList[i].current.classList.remove('bg-main-blue')
            //modeList[i].current.classList.remove('border')

            modeList[i].current.classList.remove('dark:bg-dao-green')
            modeList[i].current.classList.remove('dark:text-white')
            modeList[i].current.classList.add('dark:bg-dark-stroke')
            modeList[i].current.classList.add('dark:text-dao-gray')
            modeList[i].current.classList.add('dark:bg-sec-bg')

            modeList[i].current.classList.add('dark:border-dark-stroke')
            modeList[i].current.classList.remove('dark:border-none')

            modeList[i].current.classList.add('text-light-stroke')
            modeList[i].current.classList.add('bg-main-blue/8')
        }

        mode.current.classList.remove('dark:bg-dark-stroke')
        mode.current.classList.remove('dark:text-dao-gray')
        mode.current.classList.remove('dark:bg-sec-bg')

        mode.current.classList.remove('text-light-stroke')
        mode.current.classList.remove('bg-main-blue/8')

        mode.current.classList.add('text-white')
        mode.current.classList.add('bg-main-blue')

        mode.current.classList.add('dark:bg-dao-green')
        mode.current.classList.add('dark:border-none')
        mode.current.classList.add('dark:text-white')
    }

    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">
                <SubHeader title={"Leaderboard"} />

                <div className="grid grid-cols-3 gap-4">
                    <button onClick={() => toggleModes(weekly)} ref={weekly} className="border border-solid border-light-stroke py-2 rounded-lg text-white bg-main-blue dark:bg-dao-green dark:rounded-full dark:border-none dark:text-white">Weekly</button>
                    <button onClick={() => toggleModes(monthly)} ref={monthly} className="border border-solid border-light-stroke py-2 rounded-lg text-light-stroke bg-main-blue/8 dark:bg-sec-bg dark:rounded-full dark:border-dark-stroke dark:text-dao-gray">Monthly</button>
                    <button onClick={() => toggleModes(all_time)} ref={all_time} className="border border-solid border-light-stroke py-2 rounded-lg text-light-stroke bg-main-blue/8 dark:bg-sec-bg dark:rounded-full dark:border-dark-stroke dark:text-dao-gray">All Time</button>
                </div>

                <div className="bg-main-blue rounded-lg p-4 flex justify-between items-center dark:bg-fill-bright/19 dark:border-2 dark:border-solid dark:border-dao-green">
                    <div className="flex gap-2">
                        <Image src={"/Ellipse 224.png"} width={43} height={43} alt="" />
                        <div className="flex flex-col justify-center text-white">
                            <p className="leading-tight text-sm font-semibold">Cathy</p>
                            <p className="leading-tight text-xs">Me</p>
                        </div>
                    </div>

                    <p className="text-white font-semibold text-sm">{userInfo.points} Points</p>
                    <p className="bg-dao-yellow size-6 text-white flex items-center justify-center rounded-full text-sm">3</p>
                </div>

                <hr />

                <div className="flex flex-col gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, key) => {
                        return (
                            <LeaderboardCard key={key} name={"Cathy"} point={1000} count={key + 1} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}