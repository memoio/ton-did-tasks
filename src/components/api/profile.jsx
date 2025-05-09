import { API_URL_V2 } from "../config/config";
import axios from 'axios';

export async function setName(address, name) {
    const response = await axios.post(API_URL_V2.AIRDROP_SET_NAME,
        {
            "address": address,
            "name": name,
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

export async function setPhoto(address, photo) {
    const response = await axios.post(API_URL_V2.AIRDROP_SET_PHOTO,
        {
            "address": address,
            "photo": photo,
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

export async function bindEXInfo(did, name, uid, evmAddress) {
    const response = await axios.post(API_URL_V2.AIRDROP_BIND_EX_INFO,
        {
            "did": did,
            "name": name,
            "uid": uid,
            "evm_address": evmAddress,
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

export async function userProfile(address) {
    const response = await axios.get(API_URL_V2.AIRDROP_USER_PROFILE_V2, {
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
}