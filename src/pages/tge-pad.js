import { SubHeader, WalletAccessories } from "@/components/accessories";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { useTGE } from "@/context/TGEContext";

export default function TGEPad() {
    const { TGEInfo } = useTGE();

    return (
        <>
            <div className="px-8 py-4 flex flex-col gap-4">
                <SubHeader title={"Airdrop Wallets"} />
                <p className="text-sm px-8 text-center text-dao-gray dark:text-light-gray">Secure your exchange addresses for TGE participation</p>

                <Image src={"/Frame 34619-xx.png"} className="bg-dao-green rounded" width={393} height={117} alt="" />

                <div className="flex flex-col gap-4">
                    <WalletAccessories image={"/Binance.svg"} Link={""} title={"Binance"} address={TGEInfo.binance.bind ? TGEInfo.binance.address : null} />
                    <WalletAccessories image={"/OKX.svg"} Link={""} title={"OKX"} address={TGEInfo.okx.bind ? TGEInfo.okx.address : null} />
                    <WalletAccessories image={"/Gate.io.svg"} Link={""} title={"Gate.io"} address={TGEInfo.gateio.bind ? TGEInfo.gateio.address : null} />
                </div>
            </div>

            <Footer active={"home"} />
        </>
    )
}