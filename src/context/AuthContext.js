"use client";
import { useEffect, createContext, useContext, useState } from "react";
import { useTonAddress } from '@tonconnect/ui-react';
// import { useAccount } from "wagmi";
import { getIP } from "@/components/api/ip";
import { bindUserWallet, getUserInfo } from "@/components/api/airdrop";
import { linkXAccount, linkDiscordAccount, linkTGAccount, profile } from "@/components/api/link";
import { DISCORD_CALLBACK_URL, TWITTER_CALLBACK_URL } from '@/components/config/config';
import { getUserProfile } from "@/components/api/profile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [address, setAddress] = useState("");
    const [rawAddress, setRawAddress] = useState("");
    const walletAddress = useTonAddress();
    const walletRawAddress = useTonAddress(false);

    const [xCode, setXCode] = useState("");
    const [discordCode, setDiscordCode] = useState("");

    const [userInfo, setUserInfo] = useState({
        inviteCode: "",
        invitedCode: "",
        inviteCount: "",
        points: 0,

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
        setXCode("");
        setDiscordCode("");
        setUserInfo({
            inviteCode: "",
            invitedCode: "",
            inviteCount: "",
            points: 0,

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

        setAddress("");
    }

    const setBindWallet = () => {
        if (walletAddress && walletAddress !== "" && address !== walletAddress) {
            const bindWallet = async () => {
                setAddress(walletAddress);
                console.log(walletRawAddress);
                const splitted = walletRawAddress.split(":");
                setRawAddress(splitted[1]);
                try {
                    const ip = await getIP();

                    await bindUserWallet(walletAddress, ip);

                    const res = await getUserInfo(walletAddress);
                    setUserInfo({
                        inviteCode: res.inviteCode,
                        inviteCount: res.inviteCount,
                        points: res.points,
                        pointsRank: res.pointsRank,
                        bindedCode: res.bindedCode,
                        invitedCode: res.invitedCode,
                    });

                    console.log(res);

                    await getProfile(walletAddress);
                } catch (error) {
                    alert(`Error binding wallet: ${error}`);
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
            console.log(res.name !== "" ? res.name : "Unkonw");
            setUserProfile({
                xName: res.twitter_info.twitter_name,
                linkedX: res.twitter_info.twitter_id !== "",

                discordName: res.discord_info.discord_name,
                linkedDiscord: res.discord_info.discord_id !== "",

                telegramName: "Cathy",
                linkedTG: true,

                name: res.name !== "" ? res.name : "Unkonw",
            })

            bindTGAccount(addr);
        } catch (err) {
            console.log(err)
        }
    }

    const bindTGAccount = async (addr) => {
        if (window.Telegram?.WebApp?.initData) {
            try {
                console.log(window.Telegram?.WebApp?.initData);
                alert(window.Telegram?.WebApp?.initData);
                // await linkTGAccount(address, window.Telegram?.WebApp?.initData);

                // setUserProfile(prev => {
                //     return {
                //         ...prev,
                //         linkedTG: true,
                //         telegramName: window.Telegram.WebApp.initDataUnsafe.user.first_name,
                //     }
                // });
            } catch (err) {
                console.log(err);
            }
        }
    }

    const bindXAccount = async () => {
        try {
            console.log(address);
            console.log(xCode);
            await linkXAccount(address, xCode, TWITTER_CALLBACK_URL);
            setXCode("");

            await getProfile(address);
        } catch (err) {
            console.log(err);
        }
    }

    const bindDiscordAccount = async () => {
        try {
            console.log(address);
            console.log(discordCode);
            await linkDiscordAccount(address, discordCode, DISCORD_CALLBACK_URL);
            setDiscordCode("");

            await getProfile(address);
        } catch (err) {
            console.log(err)
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

    const setCode = (code, platform = "x") => {
        if (platform === "x") {
            setXCode(code);
        } else if (platform === "discord") {
            setDiscordCode(code);
        }
    }

    const setUserName = (name) => {
        setUserProfile(preProfile => ({
            ...preProfile,
            name: name
        }))
    }

    useEffect(() => {
        if (address !== "" && xCode !== "") {
            bindXAccount();
        }
    }, [address, xCode]);

    useEffect(() => {
        if (address !== "" && discordCode !== "") {
            bindDiscordAccount();
        }
    }, [address, discordCode]);

    useEffect(() => {
        setBindWallet();
    }, [walletAddress]);

    return (
        <AuthContext.Provider value={{ userInfo, userProfile, address, rawAddress, setUserName, setCode, setBindWallet, setInvitedCode, setPoints, addPoint, clear }}>
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
