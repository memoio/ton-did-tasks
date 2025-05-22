import { InvitationDetails, LeaderboardCard, MessageList, PointsDetails, SubHeader } from "@/components/accessories";
import Link from "next/link";
import { useTGE } from "@/context/TGEContext";

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

export default function InvitationDetailsPage() {
    const { message } = useTGE();
    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">
                <SubHeader title={"Message"} />

                <div className="flex flex-col gap-4">
                    {message.map((item, key) => {
                        return (
                            <Link key={key} href={`/message/${key}`}><MessageList image={"/messenger.png"} title={item.title} message={item.message} timestamp={timestampToLocaleTime(item.create_at)} isClamp={true} /></Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}