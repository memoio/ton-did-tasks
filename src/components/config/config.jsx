export const PRODUCT_AIRDROP_BACKEND_URL = "https://data-be.metamemo.one"

export const TON_DID_WEB = "https://t.me/tondid_bot/datadid"
export const TON_DID_WEB_RAW = "https://datadid-ton-v2.memolabs.net"
export const AIRDROP_BACKEND_URL = PRODUCT_AIRDROP_BACKEND_URL

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

    "BACKEND_ACTIVITY_BIND_CHANNEL": AIRDROP_BACKEND_URL + "/activity/bind/channel",
    "BACKEND_ACTIVITY_BIND_ACTIVITY": AIRDROP_BACKEND_URL + "/activity/bind/activity",
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

    "AIRDROP_BIND_ROAM": AIRDROP_BACKEND_URL + "/v2/user/roam/address",
    "AIRDROP_ROAM_INFO": AIRDROP_BACKEND_URL + "/v2/user/roam",
}

export const API_URL = API_URL_V2;

export const TWITTER_OAUTH_STATE = "XAuthForDataDIDV2";
export const TWITTER_CLIENT_ID = "Y1g3SVlIN0E1cUpRM2dNaHBrYUc6MTpjaQ";
export const TWITTER_CALLBACK_URL = "https://datadid-ton-v2.memolabs.net/callback/twitter";

export const DISCORD_OAUTH_STATE = "DiscordAuthForDataDIDV2";
export const DISCORD_CLIENT_ID = "1369582017217298483";
export const DISCORD_CALLBACK_URL = "https://datadid-ton-v2.memolabs.net/callback/discord";

export const Actions = {
    1: { ActionID: 1, Name: "Create DID", Points: 1000, OneTime: true },
    2: { ActionID: 2, Name: "Visit Faucet", Points: 500, OneTime: true },

    50: { ActionID: 50, Name: "Follow MEMO On Twitter", Points: 50, OneTime: true },
    51: { ActionID: 51, Name: "Join MEMO On Telegram", Points: 50, OneTime: true },
    52: { ActionID: 52, Name: "Join MEMO On Discord", Points: 50, OneTime: true },
    53: { ActionID: 53, Name: "Retweet MEMO's Tweet", Points: 50, OneTime: true },
    54: { ActionID: 54, Name: "Bind Twitter", Points: 100, OneTime: true },
    55: { ActionID: 55, Name: "Bind Telegram", Points: 100, OneTime: true },
    56: { ActionID: 56, Name: "Bind Discord", Points: 100, OneTime: true },

    70: { ActionID: 70, Name: "Daily Check In", Points: 20, OneTime: false },
    71: { ActionID: 71, Name: "Daily Share To ChatGroup", Points: 20, OneTime: false },
    72: { ActionID: 72, Name: "Daily Share To Friends", Points: 20, OneTime: false },
    73: { ActionID: 73, Name: "Daily Share To Twitter", Points: 20, OneTime: false },

    85: { ActionID: 85, Name: "Verify OAT", Points: 200, OneTime: true },
    86: { ActionID: 86, Name: "Verify NFT", Points: 500, OneTime: true },

    110: { ActionID: 110, Name: "Invite Friends", Points: 200, OneTime: false },
    111: { ActionID: 111, Name: "Be Invited", Points: 500, OneTime: true },

    1231: { ActionID: 1231, Name: "Follow Roam On Twitter", Points: 50, OneTime: true },
    1232: { ActionID: 1232, Name: "Join Roam On Telegram", Points: 50, OneTime: true },
    1233: { ActionID: 1233, Name: "Join Roam On Discord", Points: 50, OneTime: true },
}