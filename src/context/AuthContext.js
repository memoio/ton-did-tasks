"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { useTonAddress } from '@tonconnect/ui-react';
import { bindUserWallet, getUserInfo } from "@/components/api/airdrop";
import { linkTGAccount } from "@/components/api/link";
import { getUserProfile } from "@/components/api/profile";
import { useRef } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [address, setAddress] = useState("");
    const [rawAddress, setRawAddress] = useState("");
    const walletAddress = useTonAddress();
    const walletRawAddress = useTonAddress(false);

    const [isWalletBound, setIsWalletBound] = useState(false);
    const isBinding = useRef(false);

    const [userInfo, setUserInfo] = useState({
        inviteCode: "",
        invitedCode: "",
        inviteCount: "",
        points: 0,
        todayPoints: 0,
        pointsRank: "",
        bindedCode: false,
    });

    const [userProfile, setUserProfile] = useState({
        xName: "",
        linkedX: false,

        telegramName: "",
        linkedTG: true,

        discordName: "",
        linkedDiscord: false,

        name: "Unkonw",
    });

    const clear = () => {
        setUserInfo({
            inviteCode: "",
            invitedCode: "",
            inviteCount: "",
            points: 0,
            todayPoints: 0,
            pointsRank: "",
            bindedCode: false,
        });
        setUserProfile({
            xName: "",
            linkedX: false,

            telegramName: "",
            linkedTG: true,

            discordName: "",
            linkedDiscord: false,

            name: "Unkonw",
        });

        setRawAddress("");
        setAddress("");
    }

    const setBindWallet = () => {
        if (walletAddress && walletAddress !== "" && address !== walletAddress && !isBinding.current) {
            isBinding.current = true;
            const bindWallet = async () => {
                setAddress(walletAddress);
                console.log(walletRawAddress);
                const splitted = walletRawAddress.split(":");
                setRawAddress(splitted[1]);
                try {
                    await bindUserWallet(walletAddress);

                    const res = await getUserInfo(walletAddress);
                    setUserInfo({
                        inviteCode: res.inviteCode,
                        inviteCount: res.inviteCount,
                        points: res.points,
                        todayPoints: res.todayPoints,
                        pointsRank: res.pointsRank,
                        bindedCode: res.bindedCode,
                        invitedCode: res.invitedCode,
                    });

                    console.log(res);

                    setIsWalletBound(true);
                    await getProfile(walletAddress);
                } catch (error) {
                    alert(`Error binding wallet: ${error}\nPlease Refresh This Page`);
                    setIsWalletBound(false);
                } finally {
                    isBinding.current = false;
                }
            };

            bindWallet();
        }
    }

    const getProfile = async (addr) => {
        try {
            // const res = await profile(addr);
            const res = await getUserProfile(addr);
            console.log(res);
            setUserProfile({
                xName: res.twitter_info.twitter_name,
                linkedX: res.twitter_info.twitter_id !== "",

                discordName: res.discord_info.discord_name,
                linkedDiscord: res.discord_info.discord_id !== "",

                telegramName: res.telegram_info.telegram_first_name,
                linkedTG: res.telegram_info.telegram_id !== 0,

                name: res.name !== "" ? res.name : res.telegram_info.telegram_first_name,
            })

            if (res.telegram_info.telegram_id === 0) {
                bindTGAccount(addr);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const bindTGAccount = async (addr) => {
        if (window.Telegram?.WebApp?.initData) {
            try {
                await linkTGAccount(addr, window.Telegram?.WebApp?.initData);

                setUserProfile(prev => {
                    return {
                        ...prev,
                        linkedTG: true,
                        telegramName: window.Telegram.WebApp.initDataUnsafe.user.first_name,
                        name: prev.name !== "" ? prev.name : window.Telegram.WebApp.initDataUnsafe.user.first_name,
                    }
                });
            } catch (err) {
                console.log(err);
            }
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
                todayPoints: points,
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
                    todayPoints: point,
                }
            }
            return {
                ...prevUserInfo,
                points: prevUserInfo.points + point,
                todayPoints: prevUserInfo.points + point,
            };
        }
        )
    }

    const setInvitedCode = (code) => {
        setUserInfo(prevUserInfo => {
            if (!prevUserInfo) {
                return null;
            }
            if (!prevUserInfo.points) {
                return {
                    ...prevUserInfo,
                    points: 500,
                    invitedCode: code,
                    bindedCode: true,
                }
            }
            return {
                ...prevUserInfo,
                points: prevUserInfo.points + 500,
                invitedCode: code,
                bindedCode: true,
            }
        })
    }

    const setName = (name, platform = "x") => {
        if (platform === "x") {
            setUserProfile(prev => {
                if (!prev) {
                    return null;
                }
                return {
                    ...prev,
                    xName: name,
                    linkedX: true,
                }
            })
        } else if (platform === "discord") {
            setUserProfile(prev => {
                if (!prev) {
                    return null;
                }
                return {
                    ...prev,
                    discordName: name,
                    linkedDiscord: true,
                }
            })
        }
    }

    const setUserName = (name) => {
        setUserProfile(preProfile => ({
            ...preProfile,
            name: name
        }))
    }

    useEffect(() => {
        setBindWallet();
    }, [walletAddress]);

    return (
        <AuthContext.Provider value={{
            userInfo,
            userProfile,
            address,
            rawAddress,
            setUserName,
            setName,
            setBindWallet,
            setInvitedCode,
            setPoints,
            addPoint,
            clear,
            isWalletBound,
        }}>
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
