// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TON_DID_WEB_RAW } from "@/components/config/config";

export default function handler(req, res) {
    res.status(200).json({
        url: TON_DID_WEB_RAW,
        name: "Memo DID",
        iconUrl: `${TON_DID_WEB_RAW}/memo.jpg`
    });
}