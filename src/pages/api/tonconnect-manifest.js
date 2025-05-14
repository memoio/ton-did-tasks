// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json({
        url: "https://datadid-ton_v2.memolabs.net",
        name: "TON Vote",
        iconUrl: "https://datadid-ton_v2.memolabs.net/memo.png"
    });
}