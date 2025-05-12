"use client"

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { PointsDetails, SubHeader } from "@/components/accessories";
import { useAuth } from "@/context/AuthContext";
import { recordList } from '@/components/api/airdrop';

export default function PointsDetail() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { address } = useAuth();
    const [page, setPage] = useState(1);
    const size = 10;
    const [total, setTotal] = useState(0);

    const totalPages = Math.ceil(total / size);

    useEffect(() => {
        const fetchData = async () => {
            if (!address) return;

            setLoading(true);
            try {
                console.log("Begin fetch records list");

                const didRecord = await recordList(address, 1);
                const activityRecords = await recordList(address, 2);
                const data = [...activityRecords, ...didRecord];

                console.log("Fetched data:", data);

                if (Array.isArray(data)) {
                    setRecords(data);
                    setTotal(data.length);
                } else {
                    console.error("recordList returned non-array");
                }
            } catch (err) {
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [address, page]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
    };

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="px-8 py-4 flex flex-col gap-4">
            <SubHeader title={"Points Details"} />

            {loading ? (
                <p>Loading...</p>
            ) : records.length === 0 ? (
                <p>No records found.</p>
            ) : (
                <>
                    <div className="flex flex-col">
                        {records.map((record, index) => (
                            <PointsDetails
                                key={index}
                                title={`Action  ${record.actionName}`}
                                date={formatDate(record.time)}
                                amount={record.points}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-4 text-sm">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}