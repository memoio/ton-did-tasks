"use client"

import { InvitationDetails, SubHeader } from "@/components/accessories";
import { useAction } from "@/context/ActionContext";

export default function InvitationDetail() {
    const { invites } = useAction();

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    console.log(invites);
    console.log(invites.length);

    return (
        <div>
            <SubHeader title={"Invitation Details"} />
            <div className="px-4 py-8 flex flex-col gap-4 pt-10">

                {invites.length === 0 ? (
                    <div className="px-4 py-8 flex flex-col gap-4 pt-10">
                        <p className="dark:text-white">No records found.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            <p className="dark:text-white">No records found.</p>
                            {invites.map((item, index) => (
                                <InvitationDetails
                                    key={index}
                                    name={item.name}
                                    timestamp={formatDate(item.time)}
                                    address={item.address}
                                    did={item.create_did}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
