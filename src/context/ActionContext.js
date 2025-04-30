'use client';
import { createContext, useContext, useState, useEffect } from 'react';
// import { useTonAddress } from '@tonconnect/ui-react';
import { useAccount } from "wagmi";
import { recordList } from '@/components/api/airdrop';

export const ActionContext = createContext(null);

export const ActionProvider = ({ children }) => {
    // const [inviteCode, setInviteCode] = useState("")
    const [dailyAction, setDailyAction] = useState(new Set());
    const [questAction, setQuestAction] = useState(new Set());
    // const address = useTonAddress();
    const { isConnected, address } = useAccount();
    const setDaily = (index) => setDailyAction((prev) => new Set(prev).add(index));
    const setQuest = (index) => setQuestAction((prev) => new Set(prev).add(index));

    const clear = () => {
        setDailyAction(new Set());
        setQuestAction(new Set());
    }

    useEffect(() => {
        if (isConnected && address != "") {
            const HandleDailyAction = async () => {
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

                    const dailyRecords = await recordList(address, 2)
                    dailyRecords.map((element) => {
                        console.log(element);
                        if (element.action <= 100) {
                            const action = element.action - 70;
                            const preDayTime = Date.now() - 86400000;
                            if (element.time > preDayTime) {
                                setDailyAction((prev) => new Set(prev).add(action));
                            }
                        }
                    });

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