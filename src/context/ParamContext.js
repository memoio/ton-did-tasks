"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { decodeStartParams } from "@/components/params";

export const ParamsContext = createContext(null);

export const ParamsProvider = ({ children }) => {
    const [params, setParams] = useState({})

    useEffect(() => {
        const params = decodeStartParams();
        setParams(params);
    }, [])

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