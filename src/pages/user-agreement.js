import { SubHeader } from "@/components/accessories";

export default function PrivacyPolicy() {
    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4 pb-28 text-dark-bg dark:text-white">
                <SubHeader title={"User Agreement"} />

                <section className="flex flex-col gap-2">
                    <h1 className="text-dao-green font-bold">Privacy Policy</h1>
                    <p className="">By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages or make derivative versions. The app itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, still belong to MemoLabs.</p>
                </section>

                <section className="flex flex-col gap-2">
                    <h1 className="text-dao-green font-bold">Information Collection and Use</h1>
                    <p className="">MemoLabs is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.</p>
                    <p className="">The Memo DID mini app stores and processes personal data that you have provided to us, to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the Memo DID mini app won’t work properly or at all.</p>
                </section>
            </div>
        </>
    )
}