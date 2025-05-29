import { DISCORD_CALLBACK_URL, DISCORD_OAUTH_STATE, TON_DID_WEB } from '@/components/config/config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { linkDiscordAccount } from "@/components/api/link";
import Link from "next/link";
import { AlertCard } from "@/components/cards";

export default function CallbackPage() {
    const { query } = useRouter();
    const [isFainal, setIsFainal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [text, setText] = useState("");
    const [displayText, setDispalyText] = useState("");
    // const [failedText, setFailedText] = useState("");

    const closeFunc = () => {
        setIsSuccess(false);
        setIsFailed(false);
    }

    const handleCallback = async (code, state) => {
        try {
            if (typeof state === 'string') {
                const elements = state.split(" ");
                if (elements.length !== 2 && elements[0] !== DISCORD_OAUTH_STATE) {
                    setText("Bind Discord Account Failed: Invaliad Discord State");
                    setDispalyText("Bind Failed!");
                    setIsFainal(true);
                    setIsFailed(true);
                    return;
                }

                console.log(code);
                console.log(elements[1]);

                await linkDiscordAccount(elements[1], code, DISCORD_CALLBACK_URL);
                setText("Bind Discord Account Success!");
                setDispalyText("Bind Success!");
                setIsFainal(true);
                setIsSuccess(true);
            }
        } catch (error) {
            console.error('Callback error:', error);
            setText(error.message);
            setDispalyText("Bind Failed!");
            setIsFainal(true);
            setIsFailed(true);
        }
    };

    const handleError = (error, errorDescription) => {
        setText(`${error}: ${errorDescription}`);
        setDispalyText(error);
        setIsFainal(true);
        setIsFailed(true);
    }

    useEffect(() => {
        if (query.code) {
            handleCallback(query.code, query.state);
        }
    }, [query.code, query.state]);

    useEffect(() => {
        if (query.error) {
            handleError(query.error, query.error_description);
        }
    }, [query.error, query.error_description])

    if (!isFainal) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            {isSuccess && <AlertCard image={"/Frame 34643-celeb.svg"} title={"Success"} text={text} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={'Failed'} text={text} size={87} closeFunc={closeFunc} btn={"Ok"} />}

            <div className="flex flex-col gap-8 pt-68">
                <p className="flex justify-center text-center items-center text-[26px] dark:text-white">{displayText}</p>
                <Link href={TON_DID_WEB} className="flex justify-center items-center bg-transparent border-y-2 border-solid border-dao-green w-full text-dao-green px-3 py-1.5 h-[44px] min-w-16 rounded-full dark:text-white" > Back</Link>
            </div >

        </>
    );
}