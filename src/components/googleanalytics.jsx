"use client";
import Script from "next/script";

const ga_tracking_id = "G-4XMJ5PE28R";

export const GoogleAnalytics = () => {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${ga_tracking_id}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
            >
                {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ga_tracking_id}');`}
            </Script>
        </>
    );
};