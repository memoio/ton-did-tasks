import { DISCORD_OAUTH_STATE } from '@/components/config/config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
// import { linkXAccount } from "@/components/api/link";

export default function CallbackPage() {
    const router = useRouter();
    const { setCode } = useAuth();
    const { query } = router;

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const code = query.code;
                const state = query.state;

                if (state !== DISCORD_OAUTH_STATE) {
                    throw new Error('Invalid state parameter');
                }

                console.log(code);
                setCode(code, "discord");

                router.push('/earning');
            } catch (error) {
                console.error('Callback error:', error);
                router.push('/earning');
            }
        };

        if (query.code) {
            handleCallback();
        }
    }, [query.code]);

    return (
        <div>
            <p>Verifying...</p>
        </div>
    );
}