'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getMessage, getEXInfo, getRoamInfo } from '@/components/api/profile';
import { useDIDInfo } from './DIDContext';
import { useAuth } from './AuthContext';
// import { useParams } from './ParamContext';

export const TGEContext = createContext(null);

export const TGEProvider = ({ children }) => {
    // const { params } = useParams();
    const { address } = useAuth();
    const { didInfo } = useDIDInfo();
    const [initialed, setInitialed] = useState(false);
    const [roamInitialed, setRoamInitialed] = useState(false);

    const [roamInfo, setRoamInfo] = useState({
        solana: "",
        binded: false,
    })
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
        setRoamInitialed(false);
        setInitialed(false);

        setRoamInfo({
            solana: "",
            binded: false,
        })

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

    const handleRoamInfo = async () => {
        if (params && params.channel === "roam") {
            try {
                const info = await getRoamInfo(address);
                setRoamInfo({
                    solana: info.solana_address,
                    binded: true,
                })
            } catch (err) {
                console.log(err)
            }
        }
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

            if (tgeInfo) {
                let result = {};
                tgeInfo.forEach(element => {
                    console.log(element);
                    result[element.name] = {
                        uid: element.uid,
                        address: element.evm_address,
                        bind: element.uid !== "",
                    }
                });

                setTGEInfo(prev => {
                    return {
                        ...prev,
                        ...result
                    }
                });
            }
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

    const setRoam = (solanaAddress) => {
        setRoamInfo({
            solana: solanaAddress,
            binded: true,
        })
    }

    useEffect(() => {
        if (didInfo.exist && !initialed) {
            setInitialed(true);
            handleTGE();
        }
    }, [didInfo, initialed])

    useEffect(() => {
        if (address && address !== "" && !roamInitialed) {
            setRoamInitialed(true);
            handleRoamInfo();
        }
    }, [address, roamInitialed])

    useEffect(() => {
        handleMessage();
    }, [])

    return (
        <TGEContext.Provider value={{
            message,
            TGEInfo,
            roamInfo,
            addTGEInfo,
            setRoam,
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