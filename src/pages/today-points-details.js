"use client"
import { PointsDetails, SubHeader } from "@/components/accessories";
import { useAction } from "@/context/ActionContext";

export default function PointsDetail() {
    const { todayActions } = useAction()

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

    return (
        <div>
            <SubHeader title={"Points Details"} />
            <div className="gap-4 px-4 py-8 flex flex-col pt-16">

                {todayActions.length === 0 ? (
                    <p className="dark:text-white">No records found.</p>
                ) : (
                    <>
                        <div className="flex flex-col dark:border-b-2">
                            {todayActions.map((record, index) => (
                                <PointsDetails
                                    key={index}
                                    title={`${record.actionName}`}
                                    date={formatDate(record.time)}
                                    amount={record.points}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}