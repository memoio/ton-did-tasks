import Image from "next/image";
import Link from "next/link";

export default function PlayGame() {
    return (
        <>
            <div className="min-h-svh min-w-screen flex flex-col justify-center items-center p-12 bg-black/60">
                <Image src={"/Group 34536-bg.png"} className="fixed inset-0 w-screen h-screen aspect-auto object-cover" width={307.24} height={463} alt="" />
                
                <div className="flex flex-col gap-4 bg-white w-full p-8 rounded-xl text-center relative border-2 border-solid border-black dark:bg-sec-bg dark:border-dark-stroke">
                    <div className="absolute inset-x-0 mx-auto -top-14 bg-white rounded-full border border-solid border-light-stroke size-fit p-4 dark:bg-sec-bg"><Image src={"/money (1) 1.png"} className="size-16" width={46} height={46} alt="" /></div>
                    <h1 className="font-semibold text-black text-2xl mt-12 dark:text-white">Play game</h1>
                    <p className="text-dao-gray dark:text-light-gray">Earn Points with Every Tap!</p>
                    <Link href={"/game"} className="bg-dao-green rounded-full px-16 w-fit py-2 mx-auto text-white dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green">Play</Link>
                </div>
            </div>
        </>
    )
}