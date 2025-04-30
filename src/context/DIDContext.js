'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from "wagmi";
import { getDIDInfo } from '@/components/api/did';

export const DIDContext = createContext(null);

export const DIDProvider = ({ children }) => {
    const [didInfo, setDIDInfo] = useState({
        did: "",
        number: "000000",
        exist: false,
    });
    const { address, isConnected } = useAccount();

    const setDID = (did, number, exist) => {
        setDIDInfo({
            did: did,
            number: number,
            exist: exist,
        })
    }

    const HandleDID = async () => {
        try {
            // const splitted = address.split(":")
            // const splitedAddress = splitted[1];
            console.log(address);

            const did = await getDIDInfo(address);
            setDID(did.did, did.number, did.exist);
        } catch (error) {
            alert(`Error binding wallet: ${error}`);
            return
        }
    };

    const updateDID = HandleDID;

    useEffect(() => {
        if (isConnected && address !== "" && didInfo.did === "") {
            HandleDID();
        }
    }, [address]);

    return (
        <DIDContext.Provider value={{
            didInfo,
            updateDID
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