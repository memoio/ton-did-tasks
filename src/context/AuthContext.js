"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { useTonAddress } from '@tonconnect/ui-react';
import { bindUserActivity, bindUserChannel, bindUserWallet, getUserInfo } from "@/components/api/airdrop";
import { linkTGAccount } from "@/components/api/link";
import { getUserProfile } from "@/components/api/profile";
import { useRef } from "react";
import { decodeStartParams } from "@/components/params";

const defaultName = "Unkonw";
const defaultAvatar = "/Frame 34635.png";
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

        email: "",
        linkedEmail: false,

        name: defaultName,
        avatar: defaultAvatar,
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

            email: "",
            linkedEmail: false,

            name: defaultName,
            avatar: defaultAvatar,
        });

        setRawAddress("");
        setAddress("");
    }

    const bindChannelInfo = async (addr) => {
        const params = decodeStartParams();
        if (params.channel && params.channel !== "") {
            await bindUserChannel(addr, params.channel);
        } else {
            await bindUserChannel(addr, "memo");
        }

        if (params.activity && params.activity !== "") {
            await bindUserActivity(addr, params.activity);
        }
    }

    const setBindWallet = () => {
        console.log(walletAddress, address);
        if (walletAddress && walletAddress !== "" && address !== walletAddress && !isBinding.current) {
            isBinding.current = true;
            const bindWallet = async () => {
                setAddress(walletAddress);
                console.log(walletRawAddress);
                const splitted = walletRawAddress.split(":");
                setRawAddress(splitted[1]);
                try {
                    await bindUserWallet(walletAddress);
                    await bindChannelInfo(walletAddress);

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

                    await getProfile(walletAddress);
                    setIsWalletBound(true);
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

                email: res.email,
                linkedEmail: res.email !== "",

                name: res.name !== "" ? res.name : (res.telegram_info.telegram_first_name !== "" ? res.telegram_info.telegram_first_name : defaultName),
                avatar: res.icon !== "" ? res.icon : (res.telegram_info.telegram_photo !== "" ? res.telegram_info.telegram_photo : defaultAvatar)
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
                        name: prev.name !== defaultName ? prev.name : window.Telegram.WebApp.initDataUnsafe.user.first_name,
                        avatar: prev.avatar !== defaultAvatar ? prev.avatar : window.Telegram.WebApp.initDataUnsafe.user.photo_url,
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

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
                todayPoints: prevUserInfo.todayPoints + point,
            };
        }
        )
    }

    const setInvitedCode = (code) => {
        setUserInfo(prevUserInfo => {
            if (!prevUserInfo) {
                return null;
            }
            return {
                ...prevUserInfo,
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

    const setUserAvatar = (avatar) => {
        setUserProfile(preProfile => ({
            ...preProfile,
            avatar: avatar,
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
            setUserAvatar,
            setName,
            setInvitedCode,
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
