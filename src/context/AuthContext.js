"use client";
import { useEffect, createContext, useContext, useState } from "react";
// import { useTonAddress } from '@tonconnect/ui-react';
import { useAccount } from "wagmi";
import { getIP } from "@/components/api/ip";
import { bindUserWallet, getUserInfo } from "@/components/api/airdrop";
import { linkXAccount, linkDiscordAccount, profile } from "@/components/api/link";
import { DISCORD_CALLBACK_URL, TWITTER_CALLBACK_URL } from '@/components/config/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [address, setAddress] = useState("");
    const { address: walletAddress } = useAccount();

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
    });

    const setBindWallet = () => {
        if (walletAddress && walletAddress !== "" && address !== walletAddress) {
            const bindWallet = async () => {
                setAddress(walletAddress);
                try {
                    const ip = await getIP();

                    await bindUserWallet(walletAddress, ip);

                    const userInfo = await getUserInfo(walletAddress);
                    setUserInfo({
                        inviteCode: userInfo.inviteCode,
                        inviteCount: userInfo.inviteCount,
                        points: userInfo.points,
                        pointsRank: userInfo.pointsRank,
                        bindedCode: userInfo.parentCode?.length === 6,
                        invitedCode: userInfo.parentCode,
                    });

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
            const res = await profile(addr)
            console.log(res)
            setUserProfile({
                xName: res.twitter.name,
                linkedX: res.twitter.id !== "",

                discordName: res.discord.name,
                linkedDiscord: res.discord.id !== "",

                telegramName: "Cathy",
                linkedTG: true,
            })
        } catch (err) {
            console.log(err)
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
            console.log(err)
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

    const setCode = (code, platform = "x") => {
        if (platform === "x") {
            setXCode(code);
        } else if (platform === "discord") {
            setDiscordCode(code);
        }
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
        <AuthContext.Provider value={{ userInfo, userProfile, address, setCode, setBindWallet, setPoints, addPoint }}>
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
