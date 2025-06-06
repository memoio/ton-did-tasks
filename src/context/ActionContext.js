'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { recordList, inviteList } from '@/components/api/airdrop';
import { useAuth } from './AuthContext';
import { Actions } from '@/components/config/config';
import { useDIDInfo } from './DIDContext';

const checkLastDayFinished = (timestamp, day) => {
    const now = new Date(Date.now());

    const start = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
    ) - day * 86400000;
    const end = start + 86400000;

    return timestamp * 1000 >= start && timestamp * 1000 < end;
}

export const ActionContext = createContext(null);

export const ActionProvider = ({ children }) => {
    const [initialed, setInitialed] = useState(false);
    const [days, setDays] = useState(0);
    const [dailyAction, setDailyAction] = useState(new Set());
    const [questAction, setQuestAction] = useState(new Set());
    const [actions, setActions] = useState([]);
    const [todayActions, setTodayActions] = useState([]);
    const [invites, setInvites] = useState([]);

    const { address, addPoint, setInvitedCode } = useAuth();
    const { updateDID } = useDIDInfo();
    const finishDailyCheck = () => setDays(days + 1);
    const setDaily = (index) => setDailyAction((prev) => new Set(prev).add(index));
    const setQuest = (index) => setQuestAction((prev) => new Set(prev).add(index));

    const clear = () => {
        setInvites([]);
        setTodayActions([]);
        setActions([]);
        setDailyAction(new Set());
        setQuestAction(new Set());
        setDays(0);
        setInitialed(false);
    }

    const addAction = (actionInfo) => {
        const action = {
            action: actionInfo.ActionID,
            actionName: actionInfo.Name,
            points: actionInfo.Points,
            time: Math.floor(Date.now() / 1000),
        }

        setActions(prev => [...prev, action]);
        setTodayActions(prev => [...prev, action]);
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
            } else if (action > 1230 && action <= 1233) {
                setQuest(action - 1230 + 2);
            }

            addPoint(actionInfo.Points);
            addAction(actionInfo);
        } else {
            console.log(`unspport action id: ${action}`)
        }
    }

    const HandleDailyAction = async () => {
        try {
            setDailyAction(new Set());
            setQuestAction(new Set());
            setDays(0);
            const records = await recordList(address, 1);

            const questSet = new Set();
            records.map((element) => {
                const action = element.action;
                if (action >= 50 && action <= 53) {
                    questSet.add(action - 50);
                } else if (action > 1230 && action <= 1233) {
                    questSet.add(action - 1230 + 2);
                }
            });

            const dailyRecords = await recordList(address, 2);
            let consequent = true;
            let day = 0;
            const dailySet = new Set();
            dailyRecords.map((element) => {
                if (element.action <= 100) {
                    const action = element.action - 70;
                    if (checkLastDayFinished(element.time, 0)) {
                        dailySet.add(action);
                    } else if (action === 0 && consequent) {
                        if (checkLastDayFinished(element.time, day + 1)) {
                            day++;
                        } else {
                            consequent = false;
                        }
                    }
                }
            });

            if (dailySet.has(0)) {
                day++;
            }
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

    const HandleActionHistory = async () => {
        try {
            const records = await recordList(address, 0);
            let num = 0;
            records.map((element) => {
                if (checkLastDayFinished(element.time, 0)) {
                    num++;
                }
            });

            const invitations = await inviteList(address);

            setInvites(invitations);
            setActions(records);
            if (num > 0) {
                setTodayActions(records.slice(0, num));
            }
        } catch (error) {
            alert(`Error Get Action List: ${error}`);
            return
        }
    }

    useEffect(() => {
        if (address && address != "" && !initialed) {
            setInitialed(true);
            HandleDailyAction();
            HandleActionHistory();
        }
    }, [address]);

    return (
        <ActionContext.Provider value={{
            actions,
            todayActions,
            invites,
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