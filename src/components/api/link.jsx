import { API_URL } from "../config/config";
import axios from 'axios';
// const state = "This "

export async function profile(address) {
    const response = await axios.get(API_URL.AIRPROP_USER_PROFILE, {
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

export async function xOauthInfo() {
    const response = await axios.get(API_URL.AIRPROP_X_OAUTH_INFO);

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }

    return {
        method: response.data.data.method,
        codeChallenge: response.data.data.challenge,
    };
}

export async function linkXAccount(address, code, callbackUrl) {
    const response = await axios.post(
        API_URL.AIRDROP_LINK_X_ACCOUNT,
        {
            address: address,
            code: code,
            callbackUrl: callbackUrl
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

export async function linkXAccount(address, code, callbackUrl) {
    const response = await axios.post(
        API_URL.AIRDROP_LINK_X_ACCOUNT,
        {
            address: address,
            code: code,
            callbackUrl: callbackUrl
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

export async function linkXAccountByTweet(address, tweetID) {
    const response = await axios.post(
        API_URL.AIRDROP_LINK_X_ACCOUNT_BY_TWEET,
        {
            address: address,
            tweetid: tweetID
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

// export async function linkTelegramAccount(address) {
//     const response = await axios.post(
//         API_URL.AIRDROP_LINK_TELEGRAM_ACCOUNT,
//         {
//             address: address
//         },
//         {
//             headers: {
//                 accept: "application/hal+json",
//                 "Content-Type": "application/json",
//             },
//         }
//     );

//     if (response.status !== 200) {
//         throw new Error(`API request failed with status ${response.status}: ${response.data}`);
//     }

//     if (response.data.result === -1) {
//         throw new Error(`API return error: ${response.data.error}`);
//     }
// }