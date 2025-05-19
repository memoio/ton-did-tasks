import { TWITTER_OAUTH_STATE } from '@/components/config/config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
// import { linkXAccount } from "@/components/api/link";

export default function CallbackPage() {
    const router = useRouter();
    const { setCode, isWalletBound } = useAuth();
    const { query } = router;

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const code = query.code;
                const state = query.state;

                if (state !== TWITTER_OAUTH_STATE) {
                    throw new Error('Invalid state parameter');
                }

                console.log(code);
                setCode(code);
            } catch (error) {
                console.error('Callback error:', error);
            }
        };

        if (query.code) {
            handleCallback();
        }
    }, [query.code]);

    useEffect(() => {
        if (isWalletBound) {
            router.push("/earning");
        }
    }, [isWalletBound, router]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}