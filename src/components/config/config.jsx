export const PRODUCT_AIRDROP_BACKEND_URL = "https://data-be.metamemo.one"

export const TON_DID_WEB = "https://t.me/memodid_bot/datadid"
export const AIRDROP_BACKEND_URL = process.env.AIRDROP_BACKEND_URL

export const API_URL_V1 = {
    "AIRDROP_USER_WALLET_BIND": AIRDROP_BACKEND_URL + "/data/bind",
    "AIRDROP_USER_INFO": AIRDROP_BACKEND_URL + "/data/info",
    "AIRDROP_POINTS_RANK": AIRDROP_BACKEND_URL + "/data/rank",
    "AIRDROP_INVITE_BIND": AIRDROP_BACKEND_URL + "/data/invite/bind",
    "AIRDROP_INVITE_LIST": AIRDROP_BACKEND_URL + "/data/invite/list",
    "AIRDROP_RECORD_ADD": AIRDROP_BACKEND_URL + "/data/record/add",
    "AIRDROP_RECORD_LIST": AIRDROP_BACKEND_URL + "/data/record/list",

    "AIRDROP_CREATE_DID": AIRDROP_BACKEND_URL + "/did/createadmin",
    "AIRDROP_CREATE_TON_DID": AIRDROP_BACKEND_URL + "/did/createtondid",
    "AIRDROP_DID_INFO": AIRDROP_BACKEND_URL + "/did/info",

    "BACKEND_ACTIVITY_BIND_CHANNEL": BACKEND_URL + "/activity/bind/channel",
    "BACKEND_ACTIVITY_BIND_ACTIVITY": BACKEND_URL + "/activity/bind/activity",
}

export const API_URL_V2 = {
    "AIRDROP_USER_PROFILE": AIRDROP_BACKEND_URL + "/v2/link/user/profile",
    "AIRDROP_X_OAUTH_INFO": AIRDROP_BACKEND_URL + "/v2/link/x/oauth",
    "AIRDROP_LINK_X_ACCOUNT": AIRDROP_BACKEND_URL + "/v2/link/x/link",
    "AIRDROP_LINK_X_ACCOUNT_BY_TWEET": AIRDROP_BACKEND_URL + "/v2/link/x/link/tweet",
    "AIRDROP_LINK_TELEGRAM_ACCOUNT": AIRDROP_BACKEND_URL + "/v2/link/telegram/link",
    "AIRDROP_LINK_DISCORD_ACCOUNT": AIRDROP_BACKEND_URL + "/v2/link/discord/link",

    "AIRDROP_USER_WALLET_BIND": AIRDROP_BACKEND_URL + "/v2/data/bind",
    "AIRDROP_USER_INFO": AIRDROP_BACKEND_URL + "/v2/data/info",
    "AIRDROP_POINTS_RANK": AIRDROP_BACKEND_URL + "/v2/data/rank",
    "AIRDROP_INVITE_BIND": AIRDROP_BACKEND_URL + "/v2/data/invite/bind",
    "AIRDROP_INVITE_LIST": AIRDROP_BACKEND_URL + "/v2/data/invite/list",
    "AIRDROP_RECORD_ADD": AIRDROP_BACKEND_URL + "/v2/data/record/add",
    "AIRDROP_RECORD_LIST": AIRDROP_BACKEND_URL + "/v2/data/record/list",

    "AIRDROP_CREATE_DID": AIRDROP_BACKEND_URL + "/v2/did/createadmin",
    "AIRDROP_CREATE_TON_DID": AIRDROP_BACKEND_URL + "/v2/did/createtondid",
    "AIRDROP_DID_INFO": AIRDROP_BACKEND_URL + "/v2/did/info",

    "AIRDROP_SET_NAME": AIRDROP_BACKEND_URL + "/v2/user/set-name",
    "AIRDROP_SET_PHOTO": AIRDROP_BACKEND_URL + "/v2/user/set-photo",
    "AIRDROP_BIND_EX_INFO": AIRDROP_BACKEND_URL + "/v2/user/bind-exchange-info",
    "AIRDROP_GET_EX_INFO": AIRDROP_BACKEND_URL + "/v2/user/get-exchange-info",
    "AIRDROP_USER_PROFILE_V2": AIRDROP_BACKEND_URL + "/v2/user/info",

    "AIRDROP_MESSAGE": AIRDROP_BACKEND_URL + "/v2/activity/message/list",
}

export const API_URL = API_URL_V2;

export const TWITTER_OAUTH_STATE = "twitter auth for data-did-v2";
export const TWITTER_CLIENT_ID = "Y1g3SVlIN0E1cUpRM2dNaHBrYUc6MTpjaQ";
export const TWITTER_CALLBACK_URL = "http://127.0.0.1:3000/callback/twitter";

export const DISCORD_OAUTH_STATE = "discord auth for data-did-v2";
export const DISCORD_CLIENT_ID = "1369582017217298483";
export const DISCORD_CALLBACK_URL = "http://127.0.0.1:3000/callback/discord";