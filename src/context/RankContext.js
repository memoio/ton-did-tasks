import { rank } from "@/components/api/airdrop";
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from './AuthContext';

export const RankContext = createContext(null);

export const RankProvider = ({ children }) => {
    const [initialed, setInitialed] = useState(false);
    const { address } = useAuth();

    const [selfTotalRankInfo, setSelfTotalRankInfo] = useState({
        points: 0,
        inviteCount: 0,
        pointRank: 0,
        inviteRank: 0,
    })
    const [selfWeeklyRankInfo, setSelfWeeklyRankInfo] = useState({
        points: 0,
        inviteCount: 0,
        pointRank: 0,
        inviteRank: 0,
    })
    const [selfMonthlyRankInfo, setSelfMonthlyRankInfo] = useState({
        points: 0,
        inviteCount: 0,
        pointRank: 0,
        inviteRank: 0,
    })
    const [totalRankInfo, setTotalRankInfo] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
            inviteCount: 0,
        }
    ]);
    const [totalInviteRankInfo, setTotalInviteRankInfo] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
            inviteCount: 0,
        }
    ]);
    const [monthlyRankInfo, setMonthlyRankInfo] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
            inviteCount: 0,
        }
    ]);
    const [weeklyRankInfo, setWeeklyRankInfo] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
            inviteCount: 0,
        }
    ]);

    const clear = () => {
        // setInitialed(false);
    }

    const updatePointHistory = async () => {
        try {
            const totalRank = await rank(address, 0);
            setSelfTotalRankInfo(totalRank.self);
            setTotalRankInfo(totalRank.pointTop);
            setTotalInviteRankInfo(totalRank.inviteTop);


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
            totalInviteRankInfo,
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