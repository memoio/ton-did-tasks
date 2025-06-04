import { SubHeader } from "@/components/accessories";
import { useRef, useState } from "react";
import Image from "next/image";
import { LeaderboardCard, Pagination } from "@/components/cards";
import { useAuth } from "@/context/AuthContext";
import { useRank } from "@/context/RankContext";

export default function LeaderBoardDetailsPage() {
    const weekly = useRef(null)
    const monthly = useRef(null)
    const all_time = useRef(null)

    const [isWeekly, setIsWeekly] = useState(0);

    const { userInfo, userProfile } = useAuth();
    const { selfTotalRankInfo, selfMonthlyRankInfo, selfWeeklyRankInfo, pagedTotalRank, pagedMonthlyRank, pagedWeeklyRank, length, monthlyLength, weeklyLength, page, monthlyPage, weeklyPage, setRankPage } = useRank();
    const [selfRankInfo, setSelfRankInfo] = useState(selfTotalRankInfo);

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
            setIsWeekly(2);
        } else if (mode === monthly) {
            setIsWeekly(1);
        } else {
            setIsWeekly(0);
        }
    }

    const handleChanged = (page) => {
        if (isWeekly === 2) {
            setSelfRankInfo(selfWeeklyRankInfo);
            setRankPage(page, 2);
        } else if (isWeekly === 1) {
            setSelfRankInfo(selfMonthlyRankInfo);
            setRankPage(page, 1);
        } else {
            setSelfRankInfo(selfTotalRankInfo);
            setRankPage(page, 0);
        }
    }

    const currentRankList = isWeekly === 2 ? pagedWeeklyRank : isWeekly === 1 ? pagedMonthlyRank : pagedTotalRank;
    const currentPage = isWeekly === 2 ? weeklyPage : isWeekly === 1 ? monthlyPage : page;
    const currentTotalPages = isWeekly === 2 ? weeklyLength : isWeekly === 1 ? monthlyLength : length;

    return (
        <>
            <div className="px-4 py-8 flex flex-col gap-4">
                <SubHeader title={"Leaderboard"} />

                {/* <div className="grid grid-cols-3 gap-4 w-full">
                    <button onClick={() => toggleModes(weekly)} ref={weekly} className="border border-solid border-light-stroke py-2 rounded-lg text-white bg-dao-green dark:rounded-full dark:border-none dark:text-white">Weekly</button>
                    <button onClick={() => toggleModes(monthly)} ref={monthly} className="border border-solid border-light-stroke py-2 rounded-lg text-light-stroke bg-main-blue/8 dark:rounded-full dark:border-dark-stroke dark:text-dao-gray">Monthly</button>
                    <button onClick={() => toggleModes(all_time)} ref={all_time} className="border border-solid border-light-stroke py-2 rounded-lg text-light-stroke bg-main-blue/8 dark:rounded-full dark:border-dark-stroke dark:text-dao-gray">All Time</button>
                </div> */}

                <div className="bg-dao-green rounded-lg p-4 flex justify-between items-center dark:bg-sec-bg dark:border-2 dark:border-solid dark:border-dao-green">
                    <div className="flex gap-2">
                        <Image src={userProfile.avatar} className="rounded-full w-[43px] h-[43px] object-cover" width={43} height={43} alt="" />
                        <div className="flex flex-col justify-center text-white">
                            <p className="leading-tight text-sm font-semibold truncate">{userProfile.name}</p>
                            <p className="leading-tight text-xs">Me</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-10 ml-auto pl-4">
                        <p className="text-white font-semibold text-sm">{selfRankInfo.points} Points</p>
                        <p className="bg-dao-yellow size-6 text-white flex items-center justify-center rounded-full text-sm dark:bg-dao-yellow/15 dark:text-dao-yellow whitespace-nowrap">{selfRankInfo.rank <= 100 ? selfRankInfo.rank : "100+"}</p>
                    </div>
                </div>

                <hr />

                <div className="flex flex-col gap-4">
                    {
                        currentRankList.map((rankInfo, key) => {
                            return (
                                <LeaderboardCard key={key} icon={rankInfo.avatar} name={rankInfo.name} point={rankInfo.points} count={(currentPage - 1) * 10 + key + 1} />
                            )
                        })
                    }
                </div>

                <p className="text-black dark:text-white">The ranking list will update once a day...</p>
                <Pagination currentPage={currentPage} totalPages={currentTotalPages} onPageChange={handleChanged} />
            </div>
        </>
    )
}