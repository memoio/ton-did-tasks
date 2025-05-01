'use client';
import { createContext, useContext, useState, useEffect } from 'react';
// import { useTonAddress } from '@tonconnect/ui-react';
// import { useAccount } from "wagmi";
import { recordList } from '@/components/api/airdrop';
import { useAuth } from './AuthContext';

export const ActionContext = createContext(null);

export const ActionProvider = ({ children }) => {
    const [initialed, setInitialed] = useState(false);
    const [days, setDays] = useState(0);
    const [dailyAction, setDailyAction] = useState(new Set());
    const [questAction, setQuestAction] = useState(new Set());
    // const address = useTonAddress();
    // const { isConnected, address } = useAccount();
    const {address} = useAuth();
    const finishDailyCheck = () => setDays(days + 1);
    const setDaily = (index) => setDailyAction((prev) => new Set(prev).add(index));
    const setQuest = (index) => setQuestAction((prev) => new Set(prev).add(index));

    const clear = () => {
        setDailyAction(new Set());
        setQuestAction(new Set());
    }

    useEffect(() => {
        if (address && address != "" && !initialed) {
            const HandleDailyAction = async () => {
                setInitialed(true);
                try {
                    clear();
                    const records = await recordList(address, 1)

                    records.map((element) => {
                        console.log(element);
                        const action = element.action;
                        if (action >= 50 && action <= 53) {
                            setQuestAction((prev) => new Set(prev).add(action - 50));
                        }
                    });

                    const dailyRecords = await recordList(address, 2);
                    let consequent = true
                    dailyRecords.map((element) => {
                        console.log(element);
                        if (element.action <= 100) {
                            const action = element.action - 70;
                            const preDayTime = Date.now() - 86400000;
                            if (element.time > preDayTime) {
                                setDailyAction((prev) => new Set(prev).add(action));
                            }

                            if (action === 0 && consequent) {
                                if (element.time <= Date.now() - days * 86400000 && element.time > Date.now() - (days + 1) * 86400000) {
                                    setDays(days + 1);
                                } else {
                                    consequent = false;
                                }
                            }
                        }
                    });

                    console.log(days);
                    console.log(questAction);
                    console.log(dailyAction);
                } catch (error) {
                    alert(`Error Get Action List: ${error}`);
                    return
                }
            };

            HandleDailyAction();
        }
    }, [address]);

    return (
        <ActionContext.Provider value={{
            days,
            finishDailyCheck,
            dailyAction,
            questAction,
            setDaily,
            setQuest,
            clear,
        }}>
            {children}
        </ActionContext.Provider>
    );
}

export const useAction = () => {
    const context = useContext(ActionContext);

    if (!context) {
        throw new Error('useWallet must be used within a WalletContextProvider');
    }

    return context;
};