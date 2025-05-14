// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json({
        url: "https://datadid-ton-v2.memolabs.net",
        name: "Memo DID",
        iconUrl: "https://datadid-ton-v2.memolabs.net/memo.png"
    });
}