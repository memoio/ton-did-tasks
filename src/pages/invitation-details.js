"use client"

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { InvitationDetails, SubHeader } from "@/components/accessories";
import { useAuth } from "@/context/AuthContext";
import { inviteList } from '@/components/api/airdrop';

export default function InvitationDetail() {
    const [allInvites, setAllInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { address } = useAuth();
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchInvites = async () => {
            if (!address) return;

            setLoading(true);
            try {
                console.log("Begin fetch records list");

                const data = await inviteList(address);
                const sorted = [...data].sort((a, b) => b.time - a.time);
                setAllInvites(sorted);
                console.log("Fetched data:", data);
            } catch (err) {
                console.error("Failed to fetch invitation list:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvites();
    }, [address]);

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

    const totalPages = Math.ceil(allInvites.length / pageSize);
    const pagedInvites = allInvites.slice((page - 1) * pageSize, page * pageSize);

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="px-8 py-4 flex flex-col gap-4">
            <SubHeader title={"Invitation Details"} />

            {allInvites.length === 0 ? (
                <p className="dark:text-white">No records found.</p>
            ) : (
                <>
                    <div className="flex flex-col gap-4">
                        {pagedInvites.map((item, index) => (
                            <InvitationDetails
                                key={index}
                                name={item.name}
                                timestamp={formatDate(item.time)}
                                address={item.address}
                                did={item.create_did}
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

                        <span className="dark:text-white">Page {page} of {totalPages}</span>

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
