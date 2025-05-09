import { API_URL } from "../config/config";
import axios from 'axios';

export async function createDID(address) {
    console.log(address);
    const response = await axios.post(
        API_URL.AIRDROP_CREATE_DID,
        {
            address: address
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

export async function createDIDTon(caddress, paddress) {
    const response = await axios.post(
        API_URL.AIRDROP_CREATE_TON_DID,
        {
            caddress: caddress,
            paddress: paddress
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

export async function getDIDInfo(address) {
    const response = await axios.get(API_URL.AIRDROP_DID_INFO, {
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