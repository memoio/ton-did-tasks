import { rank } from "@/components/api/airdrop";
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from './AuthContext';

export const RankContext = createContext(null);

export const RankProvider = ({ children }) => {
    const [initialed, setInitialed] = useState(false);
    const { address } = useAuth();

    const [length, setLength] = useState(1);
    const [monthlyLength, setMonthlyLength] = useState(1);
    const [weeklyLength, setWeeklyLength] = useState(1);
    const [page, setPage] = useState(1);
    const [monthlyPage, setMonthlyPage] = useState(1);
    const [weeklyPage, setWeeklyPage] = useState(1);
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

    const [pagedTotalRank, setPagedTotalRank] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
        }
    ]);
    const [pagedMonthlyRank, setPagedMonthlyRank] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
        }
    ]);
    const [pagedWeeklyRank, setPagedWeeklyRank] = useState([
        {
            points: 0,
            name: "",
            avatar: "",
        }
    ]);

    const clear = () => {
        // setLength(1);
        // setWeeklyLength(1);
        // setPage(1);
        // setWeeklyPage(1);
        // setTotalRankInfo([]);
        // setWeeklyRankInfo([]);
        // setPagedTotalRank([]);
        // setPagedWeeklyRank([]);

        // setInitialed(false);
        setRankPage(1, 0);
        setRankPage(1, 1);
        setRankPage(1, 2);
    }

    const setRankPage = (page, type) => {
        if (type == 0) {
            setPage(page);
            setPagedTotalRank(totalRankInfo.slice((page - 1) * 10, page * 10));
        } else if (type == 1) {
            setMonthlyPage(page);
            setPagedMonthlyRank(monthlyRankInfo.slice((page - 1) * 10, page * 10));
        } else {
            setWeeklyPage(page);
            setPagedWeeklyRank(weeklyRankInfo.slice((page - 1) * 10, page * 10));
        }
    }

    useEffect(() => {
        if (address && address !== "" && !initialed) {
            const updatePointHistory = async () => {
                try {
                    const totalRank = await rank(address, 0);
                    setSelfTotalRankInfo(totalRank.self);
                    setLength(Math.ceil(totalRank.top.length / 10));
                    setTotalRankInfo(totalRank.top);
                    setPagedTotalRank(totalRank.top.slice(0, 10));


                    const monthlyRank = await rank(address, 1);
                    setSelfMonthlyRankInfo(monthlyRank.self);
                    setMonthlyLength(Math.ceil(monthlyRank.total.length / 10));
                    setMonthlyRankInfo(monthlyRank.total);
                    setPagedMonthlyRank(monthlyRank.total.slice(0, 10));

                    const weeklyRank = await rank(address, 2);
                    setSelfWeeklyRankInfo(weeklyRank.self);
                    setWeeklyLength(Math.ceil(weeklyRank.total.length / 10));
                    setWeeklyRankInfo(weeklyRank.total);
                    setPagedWeeklyRank(weeklyRank.total.slice(0, 10));
                    // console.log(pagedWeeklyRank);
                } catch (err) {
                    console.log(err);
                }
            }
            setInitialed(true);
            updatePointHistory();
        }
    }, [address]);

    return (
        <RankContext.Provider value={{
            selfTotalRankInfo,
            selfMonthlyRankInfo,
            selfWeeklyRankInfo,
            pagedTotalRank,
            pagedMonthlyRank,
            pagedWeeklyRank,
            length,
            monthlyLength,
            weeklyLength,
            page,
            monthlyPage,
            weeklyPage,
            setRankPage,
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