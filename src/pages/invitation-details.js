import { Footer } from "@/components/footer";
import { InvitationDetails, SubHeader } from "@/components/accessories";

export default function InvitationDetailsPage () {
    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">     
                <SubHeader title={"Invitation Details"} />

                <div className="flex flex-col gap-4">
                    <InvitationDetails name={"Kris"} timestamp={"04/16/2025  12:10:04"} bind={false} did={true} />
                    <InvitationDetails name={"Kris"} timestamp={"04/16/2025  12:10:04"} bind={true} did={true} />
                    <InvitationDetails name={"Kris"} timestamp={"04/16/2025  12:10:04"} bind={false} did={false} />
                </div>
            </div>
        </>
    )
}
