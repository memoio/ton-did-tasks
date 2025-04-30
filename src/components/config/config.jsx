export const PRODUCT_AIRDROP_BACKEND_URL = "https://data-be.metamemo.one"

export const TON_DID_WEB = "https://t.me/memodid_bot/datadid"
export const AIRDROP_BACKEND_URL = PRODUCT_AIRDROP_BACKEND_URL

const API_URL_V1 = {
    "AIRDROP_USER_WALLET_BIND": AIRDROP_BACKEND_URL + "/airdrop/bind",
    "AIRDROP_USER_INFO": AIRDROP_BACKEND_URL + "/airdrop/info",
    "AIRDROP_POINTS_RANK": AIRDROP_BACKEND_URL + "/airdrop/rank",
    "AIRDROP_INVITE_BIND": AIRDROP_BACKEND_URL + "/airdrop/invite/bind",
    "AIRDROP_INVITE_LIST": AIRDROP_BACKEND_URL + "/airdrop/invite/list",
    "AIRDROP_RECORD_ADD": AIRDROP_BACKEND_URL + "/airdrop/record/add",
    "AIRDROP_RECORD_LIST": AIRDROP_BACKEND_URL + "/airdrop/record/list",

    "AIRDROP_CREATE_DID": AIRDROP_BACKEND_URL + "/did/createadmin",
    "AIRDROP_CREATE_TON_DID": AIRDROP_BACKEND_URL + "/did/createtondid",
    "AIRDROP_DID_INFO": AIRDROP_BACKEND_URL + "/did/info",
}

const API_URL_V2 = {
    "AIRPROP_USER_PROFILE": AIRDROP_BACKEND_URL + "/v2/link/user/profile",
    "AIRPROP_X_OAUTH_INFO": AIRDROP_BACKEND_URL + "/v2/link/x/oauth",
    "AIRDROP_LINK_X_ACCOUNT": AIRDROP_BACKEND_URL + "/v2/link/x/link",
    "AIRDROP_LINK_X_ACCOUNT_BY_TWEET": AIRDROP_BACKEND_URL + "/v2/link/x/link/tweet",
    "AIRDROP_LINK_TELEGRAM_ACCOUNT": AIRDROP_BACKEND_URL + "/v2/link/x/telegram",
    "AIRDROP_LINK_DISCORD_ACCOUNT": AIRDROP_BACKEND_URL + "/v2/link/x/discord",

    "AIRDROP_USER_WALLET_BIND": AIRDROP_BACKEND_URL + "/v2/airdrop/bind",
    "AIRDROP_USER_INFO": AIRDROP_BACKEND_URL + "/v2/airdrop/info",
    "AIRDROP_POINTS_RANK": AIRDROP_BACKEND_URL + "/v2/airdrop/rank",
    "AIRDROP_INVITE_BIND": AIRDROP_BACKEND_URL + "/v2/airdrop/invite/bind",
    "AIRDROP_INVITE_LIST": AIRDROP_BACKEND_URL + "/v2/airdrop/invite/list",
    "AIRDROP_RECORD_ADD": AIRDROP_BACKEND_URL + "/v2/airdrop/record/add",
    "AIRDROP_RECORD_LIST": AIRDROP_BACKEND_URL + "/v2/airdrop/record/list",

    "AIRDROP_CREATE_DID": AIRDROP_BACKEND_URL + "/v2/did/createadmin",
    "AIRDROP_CREATE_TON_DID": AIRDROP_BACKEND_URL + "/v2/did/createtondid",
    "AIRDROP_DID_INFO": AIRDROP_BACKEND_URL + "/v2/did/info",
}

export const API_URL = API_URL_V1;