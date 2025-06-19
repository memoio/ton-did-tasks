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

    return {
        inviteCode: response.data.data.inviteCode,
        inviteCount: response.data.data.inviteCount,
        points: response.data.data.points,
        todayPoints: response.data.data.todayPoints,
        bindedCode: response.data.data.parentCode?.length === 6,
        invitedCode: response.data.data.parentCode,
        pointsRank: response.data.data.pointsRank,
    };
}

export async function bindUserWallet(address) {
    const response = await axios.post(
        API_URL.AIRDROP_USER_WALLET_BIND,
        {
            address: address,
            source: "Ton-DID",
            useragent: navigator.userAgent,
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

export async function bindUserActivity(address, activity) {
    const response = await axios.post(
        API_URL.ACTIVITY_BIND_ACTIVITY,
        {
            address: address,
            activity: activity,
        },
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }
}

export async function bindUserChannel(address, channel) {
    const response = await axios.post(
        API_URL.ACTIVITY_BIND_CHANNEL,
        {
            address: address,
            channel: channel,
        },
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }
}

export async function getUserChannel(address) {
    const response = await axios.get(API_URL.ACTIVITY_GET_ACTIVITY, {
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

    return response.data.data;
}

export async function rank(address, type) {
    const response = await axios.get(API_URL.AIRDROP_POINTS_RANK, {
        params: {
            "address": address,
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
        API_URL.AIRDROP_RECORD_ADD,
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

export async function tiersInfo(address) {
    const response = await axios.get(API_URL.ACTIVITY_TIER_INFO, {
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

    return response.data.data;
}