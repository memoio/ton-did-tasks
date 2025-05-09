import { SubHeader } from "@/components/accessories";
import { useRef, useState } from "react";
import Image from "next/image";
import { LeaderboardCard, Pagination } from "@/components/cards";
import { useAuth } from "@/context/AuthContext";
import { useRank } from "@/context/RankContext";

export default function InvitationDetailsPage() {
    const weekly = useRef(null)
    const monthly = useRef(null)
    const all_time = useRef(null)

    const [isWeekly, setIsWeekly] = useState(true);

    const { userInfo } = useAuth();
    const { pagedTotalRank, pagedWeeklyRank, length, weeklyLength, page, weeklyPage, setRankPage } = useRank();

    const modeList = [weekly, monthly, all_time]
    const toggleModes = (mode) => {
        for (let i = 0; i < modeList.length; i++) {
            modeList[i].current.classList.remove('text-white')
            modeList[i].current.classList.remove('bg-dao-green')

            modeList[i].current.classList.add('dark:border-dark-stroke')
            modeList[i].current.classList.remove('dark:border-none')

            modeList[i].current.classList.add('text-light-stroke')
            modeList[i].current.classList.add('bg-main-blue/8')
        }

        mode.current.classList.remove('dark:text-dao-gray')

        mode.current.classList.remove('text-light-stroke')
        mode.current.classList.remove('bg-main-blue/8')

        mode.current.classList.add('text-white')
        mode.current.classList.add('bg-dao-green')

        mode.current.classList.add('dark:text-white')
        if (mode === weekly) {
            setIsWeekly(true);
        } else {
            setIsWeekly(false);
        }
    }

    const handleChanged = (page) => {
        if (isWeekly) {
            setRankPage(page, 1);
        } else {
            setRankPage(page, 0);
        }
    }

    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">
                <SubHeader title={"Leaderboard"} />

                <div className="grid grid-cols-3 gap-4 w-full">
                    <button onClick={() => toggleModes(weekly)} ref={weekly} className="border border-solid border-light-stroke py-2 rounded-lg text-white bg-dao-green dark:rounded-full dark:border-none dark:text-white">Weekly</button>
                    <button onClick={() => toggleModes(monthly)} ref={monthly} className="border border-solid border-light-stroke py-2 rounded-lg text-light-stroke bg-main-blue/8 dark:rounded-full dark:border-dark-stroke dark:text-dao-gray">Monthly</button>
                    <button onClick={() => toggleModes(all_time)} ref={all_time} className="border border-solid border-light-stroke py-2 rounded-lg text-light-stroke bg-main-blue/8 dark:rounded-full dark:border-dark-stroke dark:text-dao-gray">All Time</button>
                </div>

                <div className="bg-dao-green rounded-lg p-4 flex justify-between items-center dark:bg-sec-bg dark:border-2 dark:border-solid dark:border-dao-green">
                    <div className="flex gap-2">
                        <Image src={"/Ellipse 224.png"} width={43} height={43} alt="" />
                        <div className="flex flex-col justify-center text-white">
                            <p className="leading-tight text-sm font-semibold">Cathy</p>
                            <p className="leading-tight text-xs">Me</p>
                        </div>
                    </div>

                    <p className="text-white font-semibold text-sm">{userInfo.points} Points</p>
                    <p className="bg-dao-yellow size-6 text-white flex items-center justify-center rounded-full text-sm">1000+</p>
                </div>

                <hr />

                <div className="flex flex-col gap-4">
                    {
                        isWeekly ?
                            pagedWeeklyRank.map((rankInfo, key) => {
                                const rankAddress = rankInfo.address;
                                return (
                                    <LeaderboardCard key={key} name={`${rankAddress.slice(0, 4)}...${rankAddress.slice(40)}`} point={rankInfo.points} count={key + 1} />
                                )
                            }) :
                            pagedTotalRank.map((rankInfo, key) => {
                                const rankAddress = rankInfo.address;
                                return (
                                    <LeaderboardCard key={key} name={`${rankAddress.slice(0, 4)}...${rankAddress.slice(40)}`} point={rankInfo.points} count={key + 1} />
                                )
                            })
                    }
                </div>

                <Pagination currentPage={isWeekly ? weeklyPage : page} totalPages={isWeekly ? weeklyLength : length} onPageChange={handleChanged} />
            </div>
        </>
    )
}