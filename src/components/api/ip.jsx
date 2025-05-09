import axios from 'axios';

export async function getIP() {
    const response = await axios.get("https://api.ipify.org?format=json")
    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }
    console.log(response.data.ip);

    return response.data.ip;
}