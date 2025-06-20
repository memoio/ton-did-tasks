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

    const { userProfile } = useAuth();
    const { selfTotalRankInfo, selfMonthlyRankInfo, selfWeeklyRankInfo, totalRankInfo, monthlyRankInfo, weeklyRankInfo } = useRank();
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
            setSelfRankInfo(selfWeeklyRankInfo);
        } else if (mode === monthly) {
            setIsWeekly(1);
            setSelfRankInfo(selfMonthlyRankInfo);
        } else {
            setIsWeekly(0);
            setSelfRankInfo(selfTotalRankInfo);
        }
    }

    const currentRankList = isWeekly === 2 ? weeklyRankInfo : isWeekly === 1 ? monthlyRankInfo : totalRankInfo;
    console.log(totalRankInfo)
    return (
        <>
            <SubHeader title={"Leaderboard"} />
            <div className="relative h-screen flex flex-col pt-10">
                <div className="px-4 pt-8 pb-4 bg-white dark:bg-black z-10">

                    <div className="bg-dao-green rounded-lg p-4 flex justify-between items-center dark:bg-sec-bg dark:border-2 dark:border-solid dark:border-dao-green">
                        <div className="flex gap-2">
                            <Image src={userProfile.avatar} className="rounded-full w-[43px] h-[43px] object-cover" width={43} height={43} alt="myAvatar" />
                            <div className="flex flex-col justify-center text-white">
                                <p className="leading-tight text-sm font-semibold truncate">{userProfile.name}</p>
                                <p className="leading-tight text-xs">Me</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-10 ml-auto pl-4">
                            <p className="text-white font-semibold text-sm">{selfRankInfo.points} Points</p>
                            <p className={`bg-dao-yellow ${selfRankInfo.pointRank <= 100 ? "size-6" : "size-8"} text-white flex items-center justify-center rounded-full text-sm dark:bg-dao-yellow/15 dark:text-dao-yellow whitespace-nowrap`}>
                                {selfRankInfo.pointRank <= 100 ? selfRankInfo.pointRank : "100+"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                    <div className="flex flex-col gap-4 pb-4">
                        {currentRankList.map((rankInfo, key) => (
                            <LeaderboardCard key={key} icon={rankInfo.avatar} name={rankInfo.name} point={rankInfo.points} count={key + 1} />
                        ))}
                    </div>
                </div>

                <div className="px-4 py-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 z-10">
                    <p className="text-black dark:text-white text-center">
                        The ranking list will update once a day...
                    </p>
                </div>
            </div>
        </>
    )
}