import { rank } from "@/components/api/airdrop";
import { createContext, useEffect, useState, useContext } from "react";
// import { useAccount } from "wagmi";
// import { useTonAddress } from '@tonconnect/ui-react';

export const RankContext = createContext(null);

export const RankProvider = ({ children }) => {
    const [initialed, setInitialed] = useState(false);

    const [length, setLength] = useState(1);
    const [weeklyLength, setWeeklyLength] = useState(1);
    const [page, setPage] = useState(1);
    const [weeklyPage, setWeeklyPage] = useState(1);
    const [totalRankInfo, setTotalRankInfo] = useState([
        {
            points: 0,
            address: "",
            inviteCount: 0,
        }
    ]);
    const [weeklyRankInfo, setWeeklyRankInfo] = useState([
        {
            points: 0,
            address: "",
            inviteCount: 0,
        }
    ]);

    const [pagedToalRank, setPagedToalRank] = useState([
        {
            points: 0,
            address: "",
            inviteCount: 0,
        }
    ]);
    const [pagedWeeklyRank, setPagedWeeklyRank] = useState([
        {
            points: 0,
            address: "",
            inviteCount: 0,
        }
    ]);

    const setRankPage = (page, type) => {
        if (type == 0) {
            setPage(page);
            setPagedToalRank(totalRankInfo.slice((page - 1) * 10, page * 10));
        } else {
            setWeeklyPage(page);
            setPagedWeeklyRank(weeklyRankInfo.slice((page - 1) * 10, page * 10));
        }
    }

    useEffect(() => {
        if (!initialed) {
            const updatePointHistory = async () => {
                try {
                    const totalRank = await rank(0);
                    console.log(totalRank.length);
                    setLength(totalRank.length);
                    setTotalRankInfo(totalRank);
                    setPagedToalRank(totalRank.slice(0, 10));

                    const weeklyRank = await rank(1);
                    console.log(weeklyRank.length);
                    setWeeklyLength(weeklyRank.length);
                    console.log(weeklyRank);
                    setWeeklyRankInfo(weeklyRank);
                    setPagedWeeklyRank(weeklyRank.slice(0, 10));
                } catch (err) {
                    console.log(err);
                }
            }
            setInitialed(true);
            updatePointHistory();
        }
    }, []);

    return (
        <RankContext.Provider value={{
            pagedToalRank,
            pagedWeeklyRank,
            length,
            weeklyLength,
            page,
            weeklyPage,
            setRankPage
        }}>
            {children}
        </RankContext.Provider>
    );
}

export const useRank = () => {
    const context = useContext(RankContext);

    if (!context) {
        throw new Error('useRank must be used within a RankProvider');
    }

    return context;
}