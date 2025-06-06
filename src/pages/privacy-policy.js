import { SubHeader } from "@/components/accessories";

export default function PrivacyPolicy() {
    return (
        <>
            <SubHeader title={"Privacy Policy"} />
            <div className="flex flex-col gap-4 px-4 pt-18 pb-32 text-dark-bg dark:text-white">

                <section className="flex flex-col gap-2">
                    <h1 className="text-dao-green font-bold">Privacy Policy</h1>
                    <p className="">MemoLabs built the data app as a Free app. This SERVICE is provided by MemoLabs at no cost and is intended for use as is.
                        This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
                        If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                </section>

                <section className="mt-4 flex flex-col gap-2">
                    <h1 className="text-dao-green font-bold">Information Collection and Use</h1>
                    <p className="">For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Telegram Profile Information, Telegram Activity, Information From Third Party Services and Users, App, browser, device information. The information that we request will be retained by us and used as described in this privacy policy.</p>
                    <ul className="list-disc list-inside">
                        <li>MemoLabs Profile Information: We collect the information you provide when you create Memo DID, including your name, email address, and settings and preferences.</li>
                    </ul>
                </section>
            </div>
        </>
    )
}