import { API_URL } from "../config/config";
import axios from 'axios';

export async function changeName(address, name) {
    const response = await axios.post(API_URL.AIRDROP_SET_NAME,
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

export async function changeAvatar(address, file) {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('address', address);
    const response = await axios.post(API_URL.AIRDROP_SET_PHOTO, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
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

export async function bindEXInfo(did, name, evmAddress, uid) {
    const response = await axios.post(API_URL.AIRDROP_BIND_EX_INFO,
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

export async function getEXInfo(did) {
    const response = await axios.get(API_URL.AIRDROP_GET_EX_INFO, {
        params: {
            "did": did,
        }
    });

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }

    return response.data.data;
}

export async function getMessage() {
    const response = await axios.get(API_URL.AIRDROP_MESSAGE);

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }

    return response.data.data;
}

export async function getUserProfile(address) {
    const response = await axios.get(API_URL.AIRDROP_USER_PROFILE_V2, {
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

export async function bindRoamInfo(address, solanaAddress) {
    const response = await axios.post(API_URL.AIRDROP_BIND_ROAM,
        {
            "address": address,
            "roam_solana": solanaAddress,
        },
        {
            headers: {
                accept: "application/hal+json",
                "Content-Type": "application/json",
            },
        }
    )

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    if (response.data.result === -1) {
        throw new Error(`API return error: ${response.data.error}`);
    }
}

export async function getRoamInfo(address) {
    const response = await axios.get(API_URL.AIRDROP_ROAM_INFO, {
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