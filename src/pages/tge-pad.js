import { SubHeader, WalletAccessories } from "@/components/accessories";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function TGEPad () {
    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">     
                <SubHeader title={"Airdrop Wallets"} />
                <p className="text-sm px-8 text-center text-dao-gray dark:text-light-gray">Secure your exchange addresses for TGE participation</p>

                <Image src={"/Frame 34619-xx.png"} className="bg-dao-green rounded" width={393} height={117} alt="" />
                
                <div className="flex flex-col gap-4">
                    <WalletAccessories image={"/binance.svg"} Link={""} title={"Binance"} address={"0x485y4tu...4uy54u"} />
                    <WalletAccessories image={"/okx.svg"} Link={""} title={"OKX"} address={null} />
                    <WalletAccessories image={"/gate.io.svg"} Link={""} title={"Gate.io"} address={null} />
                </div>
            </div>

            <Footer active={"home"} />      
        </>
    )
}