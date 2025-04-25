import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
    return (
        <Html lang="en" className="">
        <Head />
        <body className="antialiased bg-white dark:bg-gradient-to-r from-[#000402] from-50% to-[#00110A] to-100%">
            <Main />
            <NextScript />
        </body>
    </Html>
  );
}
