"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { decodeStartParams } from "@/components/params";
import { useAuth } from "./AuthContext";
import { getUserChannel } from "@/components/api/airdrop";

export const ParamsContext = createContext(null);

export const ParamsProvider = ({ children }) => {
    const [params, setParams] = useState({});
    const { address } = useAuth();

    const getAndSetParams = async () => {
        const params = decodeStartParams();

        if (!(params.channel && params.channel !== "")) {
            try {
                const channel = await getUserChannel(address);
                params.channel = channel;
            } catch (err) {
                console.log(err);
            }
        }
        setParams(params);
    }

    useEffect(() => {
        if (address && address != "") {
            getAndSetParams();
        }
    }, [address])

    return (
        <ParamsContext.Provider value={{
            params
        }}>
            {children}
        </ParamsContext.Provider>
    );
}

export const useParams = () => {
    const context = useContext(ParamsContext);

    if (!context) {
        throw new Error("useParams must be used within a ParamsProvider");
    }

    return context;
};