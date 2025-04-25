import { Footer } from "@/components/footer";
import { PointsDetails, SubHeader } from "@/components/accessories";

export default function PointsDetail () {
    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">     
                <SubHeader title={"Points Details"} />

                <div className="flex flex-col">
                    <PointsDetails title={"Invite"} date={"04/16/2025"} amount={200} />
                    <PointsDetails title={"Invite"} date={"04/16/2025"} amount={200} />
                    <PointsDetails title={"Invite"} date={"04/16/2025"} amount={200} />
                    <PointsDetails title={"Invite"} date={"04/16/2025"} amount={200} />
                    
                </div>
            </div>
        </>
    )
}