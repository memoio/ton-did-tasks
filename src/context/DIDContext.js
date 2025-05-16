'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getDIDInfo } from '@/components/api/did';
import { useAuth } from './AuthContext';

export const DIDContext = createContext(null);

export const DIDProvider = ({ children }) => {
    const [didInfo, setDIDInfo] = useState({
        did: "",
        number: "000000",
        exist: false,
    });
    const [initialed, setInitialed] = useState(false);
    const { rawAddress } = useAuth();

    const clear = () => {
        setDIDInfo(
            {
                did: "",
                number: "000000",
                exist: false,
            }
        );
        setInitialed(false);
    }

    const setDID = (did, number, exist) => {
        setDIDInfo({
            did: did,
            number: number,
            exist: exist,
        })
    }

    const HandleDID = async () => {
        try {
            const did = await getDIDInfo(rawAddress);
            setDID(did.did, did.number, did.exist);
            console.log(did);
        } catch (error) {
            alert(`Error get did info: ${error}`);
            return
        }
    };

    const updateDID = HandleDID;

    useEffect(() => {
        if (rawAddress && rawAddress !== "" && !initialed) {
            setInitialed(true);
            HandleDID();
        }
    }, [rawAddress, initialed]);

    return (
        <DIDContext.Provider value={{
            didInfo,
            updateDID,
            clear
        }}>
            {children}
        </DIDContext.Provider>
    );
}

export const useDIDInfo = () => {
    const context = useContext(DIDContext);

    if (!context) {
        throw new Error("useDid must be used within a DidContextProvider");
    }

    return context;
};