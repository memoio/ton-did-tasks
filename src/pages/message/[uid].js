import { MessageList, SubHeader, } from "@/components/accessories";
import { useTGE } from "@/context/TGEContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function timestampToLocaleTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(/\//g, '-');
}

function convertToNumber(uid, maxLength, defaultValue = 0) {
    let str;

    if (Array.isArray(uid)) {
        str = uid[0] || '';
    } else {
        str = uid;
    }

    const num = Number(str);
    return isNaN(num) ? defaultValue : (num >= maxLength ? defaultValue : num);
}

export default function MessageUID() {
    const router = useRouter();
    const [currentMessage, setCurrentMessage] = useState({});
    const { uid } = router.query;

    const { message } = useTGE();

    useEffect(() => {
        if (uid) {
            const id = convertToNumber(uid, message.length);
            setCurrentMessage(message[id]);
        }
    }, [uid, message])

    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">
                <SubHeader title={"Message"} />

                <div className="flex flex-col gap-4">
                    <MessageList image={"/messenger.png"} title={currentMessage.title} message={currentMessage.message} timestamp={timestampToLocaleTime(currentMessage.create_at)} isClamp={false} />
                </div>
            </div>
        </>
    )
}