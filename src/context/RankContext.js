import { rank } from "@/components/api/airdrop";
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from './AuthContext';

export const RankContext = createContext(null);

export const RankProvider = ({ children }) => {
    const [initialed, setInitialed] = useState(false);
    const { address } = useAuth();

    const [selfTotalRankInfo, setSelfTotalRankInfo] = useState({
        points: 0,
        rank: 0,
    })
    const [selfWeeklyRankInfo, setSelfWeeklyRankInfo] = useState({
        points: 0,
        rank: 0,
    })
    const [selfMonthlyRankInfo, setSelfMonthlyRankInfo] = useState({
        points: 0,
        rank: 0,
    })
    const [totalRankInfo, setTotalRankInfo] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
        }
    ]);
    const [monthlyRankInfo, setMonthlyRankInfo] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
        }
    ]);
    const [weeklyRankInfo, setWeeklyRankInfo] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
        }
    ]);

    const clear = () => {
        // setInitialed(false);
    }

    const updatePointHistory = async () => {
        try {
            const totalRank = await rank(address, 0);
            setSelfTotalRankInfo(totalRank.self);
            setTotalRankInfo(totalRank.top);


            // const monthlyRank = await rank(address, 1);
            // setSelfMonthlyRankInfo(monthlyRank.self);
            // setMonthlyRankInfo(monthlyRank.total);

            // const weeklyRank = await rank(address, 2);
            // setSelfWeeklyRankInfo(weeklyRank.self);
            // setWeeklyRankInfo(weeklyRank.total);
            // console.log(pagedWeeklyRank);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (address && address !== "" && !initialed) {
            setInitialed(true);
            updatePointHistory();
        }
    }, [address]);

    return (
        <RankContext.Provider value={{
            totalRankInfo,
            monthlyRankInfo,
            weeklyRankInfo,
            selfTotalRankInfo,
            selfMonthlyRankInfo,
            selfWeeklyRankInfo,
            clear
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