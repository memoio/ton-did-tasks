import { DidMint } from "@/components/accessories";
import { AlertCard, RoamCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import { useDIDInfo } from "@/context/DIDContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
// import { useAccount } from "wagmi";
import { createDIDTon } from "@/components/api/did";
import { useAction } from "@/context/ActionContext";
import { useParams } from "@/context/ParamContext";
import { TelegramLogoIconBW } from "@/components/icons";
import { useTGE } from "@/context/TGEContext";
import { PublicKey } from "@solana/web3.js"
import { bindRoamInfo } from "@/components/api/profile"

export default function Home() {
    const [isVisible, setIsVisible] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [successText, setSuccessText] = useState("")
    const [failedText, setFailedText] = useState("")
    const [isCopied, setIsCopied] = useState(false)
    const [showTip, setShowTip] = useState(false)


    // const { address } = useAccount();
    const { didInfo } = useDIDInfo();
    const { address, rawAddress, userProfile, userTier } = useAuth();
    const { params } = useParams();
    const { roamInfo, setRoam } = useTGE();
    const { finishAction } = useAction();

    const router = useRouter();

    const romanNumerals = ["I", "II", "III", "IV"];
    const tierName = ["Bronze", "Silver", "Gold", "Diamond"];
    const tierStyles = [
        // Tier I
        {
            bg: "bg-gradient-to-br from-[#00B66C] to-[#3ECB7D]",
            border: "border-[#00995B]/50",
        },
        // Tier II
        {
            bg: "bg-gradient-to-br from-[#336FFB] to-[#72A4FE]",
            border: "border-[#215FF2]/50",
        },
        // Tier III
        {
            bg: "bg-gradient-to-br from-[#FF730F] to-[#FFB54B]",
            border: "border-[#ED6300]/50",
        },
        // Tier IV
        {
            bg: "bg-gradient-to-br from-[#724AFF] to-[#B388EF]",
            border: "border-[#6139F0]/50",
        },
    ];

    const copyToClipboard = (text) => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => setIsCopied(true))
                .then(() => setTimeout(() => setIsCopied(false), 1500))
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        }
    };

    const closeFunc = () => {
        setIsVisible(false)
        setIsFailed(false)
        setIsSuccess(false)
        setInvalid(false)
    }

    const shortener = (text) => {
        let a = ''
        let b = ''

        if (text) {
            a = text.slice(0, 22)
            b = text.slice(-14, text.length)
        }

        return (`${a + "..." + b}`)
    }

    const isValidSolanaAddress = (solanaAddress) => {
        try {
            console.log(solanaAddress);
            new PublicKey(solanaAddress);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const bindRoamSolanaAddress = async (solanaAddress) => {
        if (isValidSolanaAddress(solanaAddress)) {
            try {
                await bindRoamInfo(address, solanaAddress);
                setRoam(solanaAddress);
                setSuccessText("Bind Roam Solana Address Success")
                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setFailedText(err.message);
                setIsFailed(true);
            }
        } else {
            setInvalid(true);
        }
    }

    const createDidFX = async () => {
        setIsVisible(true);

        try {
            await createDIDTon(rawAddress, address);
            setIsVisible(false);
            setSuccessText("DID was successfully created, go do the tasks and earn rewards!")
            setIsSuccess(true);

            finishAction(1);
        } catch (err) {
            console.log(err);
            setFailedText("DID creation failed, you may need to try again!");
            setIsFailed(true);
        }
    }

    return (
        <>
            {isVisible && <AlertCard image={"/Frame 34643-hg.png"} title={"Waiting..."} text={"DID is being created, please wait patiently!"} size={87} closeFunc={closeFunc} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Failed"} text={failedText} size={87} closeFunc={closeFunc} btn={"Try Again"} />}
            {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"Success"} text={successText} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {invalid && <AlertCard image={"/Frame 34643-x.svg"} title={"Failed"} text={"Invaliad roam address, Please input solana address"} size={87} closeFunc={closeFunc} btn={"Ok"} />}

            <div className="flex flex-col gap-4 px-4 pt-8 pb-32">
                {didInfo.exist ?
                    <>
                        <div className={`${tierStyles[userTier.tier - 1].bg}  ${tierStyles[userTier.tier - 1].border} border border-solid  p-4 flex flex-col gap-2 rounded-2xl dark:bg-sec-bg dark:border-none`}>
                            <div className="flex items-center">
                                <span className="text-white font-bold text-2xl">Data DID</span>
                                <span className="ml-2 px-3 py-1 bg-white/40 rounded-full text-base text-white font-semibold">{`No.${didInfo.number}`}</span>
                                <span className="ml-auto cursor-pointer">
                                    <svg width="20" height="20" fill="none"><path d="M15 5a2 2 0 1 0-2-2 2 2 0 0 0 2 2Zm-10 7a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm10 3a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm-7.59-1.17 6.18 2.34m0-8.34-6.18 2.34" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </span>
                            </div>
                            <div className="text-white/90 text-sm mt-1 break-all">{shortener(didInfo.did)}</div>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Image src="/icon/x.png" alt="x" width={20} height={20} />
                                </span>
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Image src="/icon/tg.png" alt="tg" width={20} height={20} />
                                </span>
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Image src="/icon/discord.png" alt="discord" width={20} height={20} />
                                </span>
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Image src="/icon/email.png" alt="email" width={20} height={20} />
                                </span>
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Image src="/icon/eth.png" alt="eth" width={20} height={20} />
                                </span>
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Image src="/icon/none.png" alt="none" width={20} height={20} />
                                </span>
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xl text-white">…</span>
                            </div>
                            <p className="text-xs text-white/90 mt-2">
                                Your all–in–one, privacy–preserving self–sovereign identity. Own, manage, and monetize your data!
                            </p>
                        </div>
                        <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-4 flex flex-col gap-2 rounded-2xl dark:bg-sec-bg dark:border-none">
                            <div className="flex items-center gap-4">
                                {/* 六边形等级图标 */}
                                <div className="w-14 h-14 flex items-center justify-center">
                                    <Image
                                        src={`/tier/${userTier.name}.png`} // 如 /tier/Bronze.png
                                        alt={userTier.name}
                                        width={56}
                                        height={56}
                                        className="w-14 h-14"
                                    />
                                </div>
                                {/* 等级标题 */}
                                <div>
                                    <div className="font-bold text-2xl text-black">{`Tier ${romanNumerals[(userTier.tier || 1) - 1]}: ${userTier.name}`}</div>
                                </div>
                            </div>
                            {/* 进度描述 */}
                            <div>
                                <div className="text-black text-base mb-1">
                                    {`Referrals left to Tier II: ${tierName[(userTier.tier)] || tierName[3]}`}
                                    <span className="ml-1 text-[#00B66C] font-bold">{userTier.inviters}</span>
                                </div>
                                <div className="text-black text-base">
                                    {`Points left to Tier II: ${tierName[(userTier.tier)] || tierName[3]}`}
                                    <span className="ml-1 text-[#00B66C] font-bold">{userTier.points}</span>
                                </div>
                            </div>
                            {/* 按钮区 */}
                            <div className="flex gap-3 mt-2">
                                <button className="flex-1 bg-gradient-to-r from-[#00B66C] to-[#3ECB7D] text-white rounded-full py-2 font-semibold shadow-md"
                                    onClick={() => router.push("/referral")}
                                >
                                    Share with Friends
                                </button>
                                <button className="flex-1 bg-gradient-to-r from-[#00B66C] to-[#3ECB7D] text-white rounded-full py-2 font-semibold shadow-md"
                                    onClick={() => router.push("/earning")}
                                >
                                    Earn Points
                                </button>
                            </div>
                        </div>

                        <div>
                            <h1 className="inline-block font-bold">List of Tiers</h1>
                            <div className="relative inline-block align-middle ml-2">
                                <span
                                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-gray-700 text-xs cursor-pointer"
                                    onMouseEnter={() => setShowTip(true)}
                                    onMouseLeave={() => setShowTip(false)}
                                >
                                    i
                                </span>
                                {showTip && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 p-3 bg-white border border-gray-300 rounded-lg shadow-lg z-50 text-sm text-gray-800">
                                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-white"></div>
                                        Uncover the hierarchy of user ranks through a collection of badges that signify different tiers within our community. These badges succinctly outline the various stages of progression.
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-4 flex flex-col gap-2 rounded-2xl dark:bg-sec-bg dark:border-none">
                            <div className="mt-2">
                                {/* 等级列表 */}
                                <div className="flex flex-col">
                                    {/* Tier I */}
                                    <div className="flex items-start">
                                        <div className="flex flex-col items-center mr-3">
                                            {/* 六边形图标 */}
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                <Image src="/tier/Bronze.png" alt="Bronze" width={48} height={48} className="w-12 h-12" />
                                            </div>
                                            {/* 虚线 */}
                                            <div className="flex-1 w-px bg-gray-300 border-dashed border-l-2 border-gray-300" style={{ minHeight: 40, marginTop: 2 }}></div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Tier I: Bronze</div>
                                            <div className="text-gray-600 text-sm">New Users</div>
                                        </div>
                                    </div>
                                    {/* Tier II */}
                                    <div className="flex items-start">
                                        <div className="flex flex-col items-center mr-3">
                                            {/* 六边形图标 */}
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                <Image src="/tier/Silver.png" alt="Silver" width={48} height={48} className="w-12 h-12" />
                                            </div>
                                            {/* 虚线 */}
                                            <div className="flex-1 w-px bg-gray-300 border-dashed border-l-2 border-gray-300" style={{ minHeight: 40, marginTop: 2 }}></div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Tier II: Silver</div>
                                            <div className="text-gray-600 text-sm">20 Referrals or 20k Points</div>
                                        </div>
                                    </div>
                                    {/* Tier III */}
                                    <div className="flex items-start">
                                        <div className="flex flex-col items-center mr-3">
                                            {/* 六边形图标 */}
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                <Image src="/tier/Gold.png" alt="Gold" width={48} height={48} className="w-12 h-12" />
                                            </div>
                                            {/* 虚线 */}
                                            <div className="flex-1 w-px bg-gray-300 border-dashed border-l-2 border-gray-300" style={{ minHeight: 40, marginTop: 2 }}></div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Tier III: Gold</div>
                                            <div className="text-gray-600 text-sm">30 Referrals or 30k Points</div>
                                        </div>
                                    </div>
                                    {/* Tier IV */}
                                    <div className="flex items-start">
                                        <div className="flex flex-col items-center mr-3">
                                            {/* 六边形图标 */}
                                            <div className="w-12 h-12 flex items-center justify-center">
                                                <Image src="/tier/Diamond.png" alt="Diamond" width={48} height={48} className="w-12 h-12" />
                                            </div>
                                            {/* 最后一项不需要虚线 */}
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Tier IV: Diamond</div>
                                            <div className="text-gray-600 text-sm">40 Referrals or 40k Points</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-4 flex flex-col gap-2 rounded-2xl dark:bg-sec-bg dark:border-none"> */}
                        <div className="bg-main-blue/8 border border-gray-300 rounded-lg p-2 mt-4">
                            <div className="font-semibold mb-2">NFT Rewards</div>
                            <div className="border-b border-gray-300 mb-2"></div>
                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* NFT 卡片1 */}
                                    <div className="bg-white rounded-lg border border-gray-300 flex flex-col items-center p-2">
                                        <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center mb-2">
                                            {/* 图片占位符 */}
                                            <span className="text-gray-400 text-2xl">
                                                <svg width="32" height="32" fill="none"><rect width="32" height="32" rx="4" fill="#E5E7EB" /><path d="M10 20l4-4 4 4m-8-8h8" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </span>
                                        </div>
                                        <div className="text-sm text-black">Name2</div>
                                    </div>
                                    {/* NFT 卡片2 */}
                                    <div className="bg-white rounded-lg border border-gray-300 flex flex-col items-center p-2">
                                        <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center mb-2">
                                            <span className="text-gray-400 text-2xl">
                                                <svg width="32" height="32" fill="none"><rect width="32" height="32" rx="4" fill="#E5E7EB" /><path d="M10 20l4-4 4 4m-8-8h8" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </span>
                                        </div>
                                        <div className="text-sm text-black">Name1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                        {params.channel && params.channel === "roam" ?
                            <div className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke p-4 rounded-[10px]">
                                <h2 className="font-semibold text-lg text-black dark:text-white">Roam Info</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <RoamCard icon={<TelegramLogoIconBW />} text={"Solana Address"} address={roamInfo.solana} binded={roamInfo.binded} confirmFunc={bindRoamSolanaAddress} />
                                </div>
                            </div>
                            :
                            <>
                            </>
                        }
                    </>
                    :
                    <>
                        <div className="bg-main-blue/8 border border-solid border-main-blue/21 p-8 flex flex-col items-center justify-center text-center gap-2 rounded-2xl dark:bg-sec-bg dark:border-none">
                            <Image src={userProfile.avatar} className="rounded-full w-[89px] h-[89px] object-cover" width={89} height={89} alt="" />
                            <h2 className="text-dao-yellow text-2xl font-semibold">Data DID</h2>
                            <p className="text-xs text-dao-gray dark:text-white">Your all–in–one, privacy–preserving self–sovereign identity. Own, manage, and monetize your data!</p>
                        </div>
                        <div className="flex flex-col">
                            <DidMint title={"Network"} text={"Memo"} />
                            <DidMint title={"Mint To"} text={`${address?.slice(0, 6)}...${address?.slice(42)}`} />
                            <DidMint title={"Pay With"} text={"0.0 memo"} />
                            <DidMint title={"Total"} text={"0.0 memo+0.0 gas"} />

                            <button onClick={createDidFX} className="font-semibold py-2 bg-dao-green text-white rounded-full border-y-2 border-solid mt-4 dark:bg-sec-bg dark:border-dao-green">Create</button>
                            <p className="italic text-center leading-tight mt-4 text-sm text-dao-gray">Note: At this stage, the cost of creating DID is borne by MEMO</p>
                        </div>
                    </>
                }



            </div >
            <Footer active={"did"} />
        </>
    )
}