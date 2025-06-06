import { SubHeader } from "@/components/accessories";
import { Footer } from "@/components/footer";
import { useRouter } from "next/router";

export default function HowToRegister() {
    const router = useRouter()
    const { page } = router.query;

    return (
        <>
            <SubHeader title={"TGE Launchpad Quick Guide"} />
            <div className="px-4 pt-18 flex flex-col gap-4 pb-28">

                <div className="text-dao-gray dark:text-white">
                    <div className="flex items-center gap-4"><p className="min-w-8 max-w-8 size-8 font-semibold bg-dao-yellow/15 text-dao-yellow rounded-full flex items-center justify-center">1</p> Log in to the MEMO TGE Launchpad</div>
                    <ul className="list-disc list-inside pl-4 text-dao-gray dark:text-white">
                        <li>Click the “Register Now” 👍 Tip: Use the exclusive link for future more airdrop opportunities from other projects. Existing <span className="">{page}</span> users can use their current account.</li>
                    </ul>
                </div>

                <div className="">
                    <div className="flex items-center gap-4"><p className="min-w-8 max-w-8 size-8 font-semibold bg-dao-yellow/15 text-dao-yellow rounded-full flex items-center justify-center">2</p> Open Your {page} Account</div>
                    <ul className="list-disc list-inside pl-4 text-dao-gray dark:text-white">
                        <li>Copy Your Unique Identifier (UID) number</li>
                        <li>Copy Your Ethereum (ETH) address</li>
                    </ul>
                </div>

                <div className="">
                    <div className="flex gap-4"><p className="min-w-8 max-w-8 size-8 font-semibold bg-dao-yellow/15 text-dao-yellow rounded-full flex items-center justify-center">3</p> Paste your UID and ETH address into the corresponding boxes on the Launchpad.</div>
                    <p className="text-dao-gray dark:text-white mt-4">If your region restricts access to exchanges, try using a VPN. Join MEMO Pre-Mining now more exchanges will be open for registration soon! 🚀</p>
                </div>
            </div>

            <Footer active={"home"} />
        </>
    )
}