import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'

export default function Document() {
    return (
        <Html lang="en" className="">
            <Head>
                <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
            </Head>
            <body className="antialiased bg-white dark:bg-gradient-to-r from-[#000402] from-50% to-[#00110A] to-100%">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
