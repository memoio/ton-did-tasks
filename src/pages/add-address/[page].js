import { SubHeader } from "@/components/accessories";
import { AlertCard } from "@/components/cards";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddAddress() {
    const router = useRouter()
    const { page } = router.query;
    const [isVisible, setIsVisible] = useState(false)
    const [isFailed, setIsFailed] = useState(false)

    const [info, setInfo] = useState({
        address: '',
        uid: ''
    });

    const closeFunc = () => {
        setIsVisible(false)
        setIsFailed(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddEX = () => {
        console.log(info.address);
        console.log(info.uid);

        setIsFailed(true);
    }

    const handleRegister = () => {
        setIsFailed(true);
    }

    return (
        <>
            {isVisible && <AlertCard image={"/Clip path group-check.svg"} title={"Add Successful"} size={87} closeFunc={closeFunc} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Not Support"} size={87} closeFunc={closeFunc} />}

            <div className="px-8 py-4 flex flex-col gap-4 pb-28">
                <SubHeader title={"Add Address"} />

                <div className="bg-dao-green rounded-lg p-4 relative flex justify-between items-center text-white dark:text-light-gray dark:bg-sec-bg">
                    <div className="absolute inset-0 bg-black/20"></div>

                    <div className="flex gap-2 items-center relative z-10">
                        <Image src={`/${page.toLowerCase()}.svg`} width={42} height={42} alt="" />
                        <p className="">{page}</p>
                    </div>
                    <Link className="relative z-10" href={`/how-to-register/${page}`}>How To Register</Link>
                </div>

                {/* <Link href={"/register"} className="bg-dao-green rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green w-full py-3 text-center text-white">Register Now</Link> */}
                <button onClick={handleRegister} className="bg-dao-green rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green w-full py-3 text-center text-white">Register Now</button>
                {/* <button onClick={handleRegister} className="relative z-10" href={`/how-to-register/${page}`}>How To Register</button> */}
                {/* <form className="text flex flex-col gap-4 mt-4" onSubmit={handleAddEX}> */}
                <div className="flex flex-col gap-1">
                    <label for="address" className="text-black dark:text-white">Wallet Address</label>
                    <input onChange={handleChange} name="address" type="text" className="bg-main-blue/8 dark:bg-sec-bg text-dao-gray placeholder:text-dao-gray dark:text-white border border-solid border-main-blue/20 dark:border-none px-4 py-3 rounded-lg" placeholder="Input Wallet Address" />
                </div>
                <div className="flex flex-col gap-1">
                    <label for="uid" className="text-black dark:text-white">UID</label>
                    <input onChange={handleChange} name="uid" type="text" className="bg-main-blue/8 dark:bg-sec-bg text-dao-gray placeholder:text-dao-gray dark:text-white border border-solid border-main-blue/20 dark:border-none px-4 py-3 rounded-lg" placeholder="Input Wallet Address" />
                </div>

                <button onClick={handleAddEX} className="bg-dao-green rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green w-full py-3 text-center text-white">Confirm</button>
                {/* </form> */}
            </div>

            <Footer active="home" />
        </>
    )
}