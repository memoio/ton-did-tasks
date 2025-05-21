import { TWITTER_CALLBACK_URL, TWITTER_OAUTH_STATE } from '@/components/config/config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import { linkXAccount } from "@/components/api/link";

export default function CallbackPage() {
    const router = useRouter();
    const { setCode, isWalletBound } = useAuth();
    const { query } = router;

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const code = query.code;
                const state = query.state;

                if (typeof state === 'string') {
                    const elements = state.split(" ");
                    if (elements.length !== 2 && elements[0] !== TWITTER_OAUTH_STATE) {
                        setText("Bind X Account Failed: Invaliad X State");
                        setIsFainal(true);
                        return;
                    }

                    console.log(code);
                    console.log(elements[1]);

                    await linkXAccount(elements[1], code, TWITTER_CALLBACK_URL);
                    setText("Bind X Account Success!");
                    setIsFainal(true);
                }
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
        <div>
            {
                isFainal ?
                    (<Link href={TON_DID_WEB} className="dark:text-white" > Back</Link>)
                    :
                    (< div className="flex justify-center items-center h-screen" >
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div >)
            }
        </div>
    );
}