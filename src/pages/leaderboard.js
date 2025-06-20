import { SubHeader } from "@/components/accessories";
import { useRef, useState } from "react";
import Image from "next/image";
import { LeaderboardCard, Pagination } from "@/components/cards";
import { useAuth } from "@/context/AuthContext";
import { useRank } from "@/context/RankContext";
// test
import { useEffect } from "react";

export default function LeaderBoardDetailsPage() {
    const weekly = useRef(null)
    const monthly = useRef(null)
    const all_time = useRef(null)

    const [isWeekly, setIsWeekly] = useState(0);

    const [rankType, setRankType] = useState("points"); // 'points' | 'referrals'

    const { userProfile } = useAuth();
    const { selfTotalRankInfo, selfMonthlyRankInfo, selfWeeklyRankInfo, totalRankInfo, monthlyRankInfo, weeklyRankInfo, totalInviteRankInfo } = useRank();
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

    const currentRankList = rankType === "points" ? (isWeekly === 2 ? weeklyRankInfo : isWeekly === 1 ? monthlyRankInfo : totalRankInfo) : totalInviteRankInfo;

    const medalIcons = ["/medal-gold.svg", "/medal-silver.svg", "/medal-bronze.svg"];

    // test
    useEffect(() => {
        console.log("selfRankInfo:", selfRankInfo);
        console.log("currentRankList:", currentRankList);
        console.log("inviteRankInfo:", totalInviteRankInfo);
    }, [selfRankInfo, currentRankList, totalInviteRankInfo]);

    return (
        <>
            <SubHeader title={"Leaderboard"} />
            <div className="relative h-screen flex flex-col pt-10">
                {/* {fix top area} */}
                <div className="shrink-0 px-4 pt-8 pb-0 bg-white dark:bg-black z-10">
                    {/* {rank type} */}
                    <div className="flex w-full bg-gray-100 dark:bg-dark-bg rounded-full p-1 mb-4">
                        <button
                            className={`flex-1 py-2 rounded-full text-sm font-semibold ${rankType === "points" ? "bg-dao-green text-white" : "text-gray-500"
                                }`}
                            onClick={() => setRankType("points")}
                        >
                            Points Rank
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-full text-sm font-semibold ${rankType === "referral" ? "bg-dao-green text-white" : "text-gray-500"
                                }`}
                            onClick={() => setRankType("referral")}
                        >
                            Referral Rank
                        </button>
                    </div>

                    {/* {my rank} */}
                    <div className="text-sm text-gray-400 tracking-wider dark:text-dao-gray mb-1">My Rank</div>
                    <div className="bg-dao-green rounded-lg p-4 flex justify-between items-center dark:bg-sec-bg dark:border dark:border-dao-green">
                        <div className="flex gap-2 items-center min-w-0">
                            <Image
                                src={userProfile.avatar}
                                className="rounded-full w-[43px] h-[43px] object-cover"
                                width={43}
                                height={43}
                                alt="myAvatar"
                            />
                            <div className="flex flex-col justify-center min-w-0 text-white">
                                <p className="leading-tight text-sm font-semibold truncate">{userProfile.name}</p>
                                <p className="text-xs">Me</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 ml-auto text-sm font-semibold text-white whitespace-nowrap">
                            <p className="w-16 text-center">
                                {selfRankInfo.inviteCount}
                            </p>
                            <p className="w-20 text-center">
                                {selfRankInfo.points}
                            </p>
                            <p className="w-8 h-8 bg-dao-yellow text-white flex items-center justify-center rounded-full text-sm dark:bg-dao-yellow/15 dark:text-dao-yellow">
                                {rankType === "points" ? (selfRankInfo.pointRank <= 100 ? selfRankInfo.pointRank : "100+") : (selfRankInfo.inviteRank <= 100 ? selfRankInfo.inviteRank : "100+")}
                            </p>
                        </div>
                    </div>

                    {/* { top table header} */}
                    <div className="px-4 pt-4"></div>
                    <div className="text-sm text-gray-400 tracking-wider dark:text-dao-gray mb-2">Top 100</div>
                    <div className="flex flex-col gap-4 pb-4">

                        <div className="flex items-center gap-6 px-4 text-sm font-semibold text-gray-500 dark:text-dao-gray">
                            <div className="flex-1">User</div>
                            <p className="w-16 text-center">Referrals</p>
                            <p className="w-20 text-center">Points</p>
                            <p className="w-8 text-center">Rank</p>
                        </div>
                    </div>

                    {/* {Top 3} */}
                    {currentRankList.slice(0, 3).map((rankInfo, index) => (
                        <div key={index} className="border-glow">
                            <div className="bg-white dark:bg-sec-bg rounded-lg">
                                <LeaderboardCard
                                    key={index}
                                    icon={rankInfo.avatar}
                                    name={rankInfo.name}
                                    inviteCount={rankInfo.inviteCount}
                                    point={rankInfo.points}
                                    rank={index + 1}
                                    showCrown={true}
                                    medalIcon={medalIcons[index]}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* {scrolling area} */}
                <div className="flex-1 overflow-y-auto px-4 pt-0 pb-6">
                    {currentRankList.slice(3).map((rankInfo, index) => (
                        <LeaderboardCard
                            key={index + 3}
                            icon={rankInfo.avatar}
                            name={rankInfo.name}
                            inviteCount={rankInfo.inviteCount}
                            point={rankInfo.points}
                            rank={index + 4}
                        />
                    ))}
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