'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getMessage, getEXInfo } from '@/components/api/profile';
import { useDIDInfo } from './DIDContext';

export const TGEContext = createContext(null);

export const TGEProvider = ({ children }) => {
    const { didInfo } = useDIDInfo();
    const [initialed, setInitialed] = useState(false);

    const [message, setMessage] = useState([])
    const [TGEInfo, setTGEInfo] = useState({
        binance: {
            uid: "",
            address: "",
            bind: false,
        },

        okx: {
            uid: "",
            address: "",
            bind: false,
        },

        gateio: {
            uid: "",
            address: "",
            bind: false,
        },
    });

    const clear = () => {
        setMessage([]);
        setInitialed(false);

        setTGEInfo({
            binance: {
                uid: "",
                address: "",
                bind: false,
            },

            okx: {
                uid: "",
                address: "",
                bind: false,
            },

            gateio: {
                uid: "",
                address: "",
                bind: false,
            },
        });
    }

    const handleMessage = async () => {
        try {
            const messages = await getMessage();
            setMessage(messages);
        } catch (err) {
            console.log(err)
        }
    }

    const handleTGE = async () => {
        try {
            const tgeInfo = await getEXInfo(didInfo.did);

            console.log(tgeInfo);
            const result = tgeInfo.reduce((acc, { name, uid, evm_address }) => {
                acc[name] = {
                    uid: uid,
                    evm_address: evm_address,
                    bind: uid !== "" ? true : false,
                };
                return acc;
            })
            console.log(result);

            setTGEInfo(prev => {
                return {
                    ...prev,
                    result
                }
            });
        } catch (err) {
            console.log(err)
        }
    }

    const addTGEInfo = (name, address, uid) => {
        setTGEInfo(prev => {
            return {
                ...prev,
                [name]: {
                    address: address,
                    uid: uid,
                    bind: true,
                }
            }
        });
    }

    useEffect(() => {
        if (didInfo.exist && !initialed) {
            setInitialed(true);
            handleTGE();
        }
    }, [didInfo, initialed])

    useEffect(() => {
        handleMessage();
    }, [])

    return (
        <TGEContext.Provider value={{
            message,
            TGEInfo,
            addTGEInfo,
            clear
        }}>
            {children}
        </TGEContext.Provider>
    );
}

export const useTGE = () => {
    const context = useContext(TGEContext);

    if (!context) {
        throw new Error("useTGE must be used within a TGEContextProvider");
    }

    return context;
};