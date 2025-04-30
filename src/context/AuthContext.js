"use client";
import { useEffect, createContext, useContext, useState } from "react";
// import { useTonAddress } from '@tonconnect/ui-react';
import { useAccount } from "wagmi";
import { getIP } from "@/components/api/ip";
import { bindUserWallet, getUserInfo } from "@/components/api/airdrop";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const address = useTonAddress();
    const { address } = useAccount();
    const [isExist, setIsExist] = useState(false);

    const [userInfo, setUserInfo] = useState({
        inviteCode: "",
        invitedCode: "",
        inviteCount: "",
        points: 0,

        pointsRank: "",
        bindedCode: false,
    });

    const setBindWallet = () => {
        if (address != "") {
            const bindWallet = async () => {
                try {
                    const ip = await getIP();

                    await bindUserWallet(address, ip);

                    const userInfo = await getUserInfo(address);
                    setUserInfo({
                        inviteCode: userInfo.inviteCode,
                        inviteCount: userInfo.inviteCount,
                        points: userInfo.points,
                        pointsRank: userInfo.pointsRank,
                        bindedCode: userInfo.parentCode?.length === 6,
                        invitedCode: userInfo.parentCode,
                    });
                } catch (error) {
                    alert(`Error binding wallet: ${error}`);
                }
            };

            bindWallet();
            setIsExist(true);
        }
    }

    const setPoints = (points) => {
        setUserInfo(prevUserInfo => {
            if (!prevUserInfo) {
                return null;
            }
            return {
                ...prevUserInfo,
                points: points,
            };
        }
        )
    };

    const addPoint = (point) => {
        setUserInfo(prevUserInfo => {
            if (!prevUserInfo) {
                return null;
            }
            if (!prevUserInfo.points) {
                return {
                    ...prevUserInfo,
                    points: point,
                }
            }
            return {
                ...prevUserInfo,
                points: prevUserInfo.points + point,
            };
        }
        )
    }

    useEffect(() => {
        if (address && address != "" && !isExist) {
            console.log(address);
            setBindWallet()
        }
    }, [address]);

    return (
        <AuthContext.Provider value={{ userInfo, setBindWallet, setPoints, addPoint }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
