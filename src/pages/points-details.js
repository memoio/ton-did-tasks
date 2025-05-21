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

                const data = await recordList(address, 0);

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

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
    const pagedRecords = records.slice((page - 1) * size, page * size);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="px-8 py-4 flex flex-col gap-4">
            <SubHeader title={"Points Details"} />

            {records.length === 0 ? (
                <p className="dark:text-white">No records found.</p>
            ) : (
                <>
                    <div className="flex flex-col dark:border-b-2">
                        {pagedRecords.map((record, index) => (
                            <PointsDetails
                                key={index}
                                title={`${record.actionName}`}
                                date={formatDate(record.time)}
                                amount={record.points}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-4 text-sm">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50 dark:text-white"
                        >
                            Previous
                        </button>

                        <span className="dark:text-white">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50 dark:text-white"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}