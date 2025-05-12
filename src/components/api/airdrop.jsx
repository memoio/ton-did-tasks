import { API_URL, API_URL_V1 } from "../config/config";
import axios from 'axios';

export async function getUserInfo(address) {
    const response = await axios.get(API_URL.AIRDROP_USER_INFO, {
        params: {
            "address": address,
        },
    });

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }

    console.log(response.data.data);

    return {
        inviteCode: response.data.data.inviteCode,
        inviteCount: response.data.data.inviteCount,
        points: response.data.data.points,
        bindedCode: response.data.data.parentUid !== null,
        invitedCode: response.data.data.parentCode,
        pointsRank: response.data.data.pointsRank,
    };
}

export async function bindUserWallet(address, ip) {
    const response = await axios.post(
        API_URL.AIRDROP_USER_WALLET_BIND,
        {
            address: address,
            source: "Ton-DID",
            useragent: navigator.userAgent,
            ip: ip,
        },
        {
            headers: {
                accept: "application/hal+json",
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }
    console.log("bind address success")
}

export async function rank(type) {
    const response = await axios.get(API_URL.AIRDROP_POINTS_RANK, {
        params: {
            "type": type,
        },
    });

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }

    return response.data.data
}

export async function bindInviteCode(address, code) {
    console.log(address, code);
    const response = await axios.post(
        API_URL.AIRDROP_INVITE_BIND,
        {
            address: address,
            code: code
        },
        {
            headers: {
                accept: "application/hal+json",
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }
}

export async function inviteList(address) {
    const response = await axios.get(API_URL.AIRDROP_INVITE_LIST, {
        params: {
            "parent": address,
        },
    });

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }

    return response.data.data;
}

export async function recordAdd(address, actionId) {
    console.log(address, actionId);
    const response = await axios.post(
        API_URL_V1.AIRDROP_RECORD_ADD,
        {
            address: address,
            actionid: actionId
        },
        {
            headers: {
                accept: "application/hal+json",
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }
}

export async function recordList(address, type) {
    const response = await axios.get(API_URL.AIRDROP_RECORD_LIST, {
        params: {
            "address": address,
            "ltype": type,
        },
    });

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }

    return response.data.data;
}