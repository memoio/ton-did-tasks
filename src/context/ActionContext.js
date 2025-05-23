'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { recordList } from '@/components/api/airdrop';
import { useAuth } from './AuthContext';
import { Actions } from '@/components/config/config';
import { useDIDInfo } from './DIDContext';

export const ActionContext = createContext(null);

export const ActionProvider = ({ children }) => {
    const [initialed, setInitialed] = useState(false);
    const [days, setDays] = useState(0);
    const [dailyAction, setDailyAction] = useState(new Set());
    const [questAction, setQuestAction] = useState(new Set());
    const { address, addPoint, setInvitedCode } = useAuth();
    const { updateDID } = useDIDInfo();
    const finishDailyCheck = () => setDays(days + 1);
    const setDaily = (index) => setDailyAction((prev) => new Set(prev).add(index));
    const setQuest = (index) => setQuestAction((prev) => new Set(prev).add(index));

    const clear = () => {
        setDailyAction(new Set());
        setQuestAction(new Set());
        setDays(0);
        setInitialed(false);
    }

    const finishAction = (action, inviteCode = '') => {
        const actionInfo = Actions[action];
        console.log(actionInfo);
        if (actionInfo !== null) {
            if (action >= 50 && action < 70) {
                setQuest(action - 50);
            } else if (action >= 70 && action < 80) {
                setDaily(action - 70);
                if (action === 70) {
                    finishDailyCheck();
                }
            } else if (action === 111) {
                setInvitedCode(inviteCode);
            } else if (action === 1) {
                updateDID();
            }

            addPoint(actionInfo.Points);
        } else {
            console.log(`unspport action id: ${action}`)
        }
    }

    useEffect(() => {
        if (address && address != "" && !initialed) {
            const HandleDailyAction = async () => {
                try {
                    setDailyAction(new Set());
                    setQuestAction(new Set());
                    setDays(0);
                    const records = await recordList(address, 1)

                    let questSet = new Set();
                    records.map((element) => {
                        // console.log(element);
                        const action = element.action;
                        if (action >= 50 && action <= 53) {
                            questSet.add(action - 50);
                        }
                    });

                    const dailyRecords = await recordList(address, 2);
                    let consequent = true;
                    let dailySet = new Set();
                    let day = 0;
                    dailyRecords.map((element) => {
                        // console.log(element);
                        if (element.action <= 100) {
                            const action = element.action - 70;
                            const preDayTime = Date.now() - 86400000;
                            if (element.time * 1000 > preDayTime) {
                                dailySet.add(action);
                            }

                            if (action === 0 && consequent) {
                                if (element.time * 1000 <= Date.now() - day * 86400000 && element.time * 1000 > Date.now() - (days + 1) * 86400000) {
                                    day++;
                                } else {
                                    consequent = false;
                                }
                            }
                        }
                    });

                    console.log(day);
                    console.log(dailySet);
                    console.log(questSet);
                    setDays(day);
                    setDailyAction(dailySet);
                    setQuestAction(questSet);
                } catch (error) {
                    alert(`Error Get Action List: ${error}`);
                    return
                }
            };

            setInitialed(true);
            HandleDailyAction();
        }
    }, [address]);

    return (
        <ActionContext.Provider value={{
            days,
            dailyAction,
            questAction,
            finishAction,
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