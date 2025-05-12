import { SubHeaderTri } from "@/components/accessories";
import { AlertCard } from "@/components/cards";
import { useState } from "react";
import { useRouter } from "next/router";
import { bindInviteCode } from "@/components/api/airdrop";
import { useAuth } from "@/context/AuthContext";

export default function InviteCode() {
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [failedText, setFaileText] = useState("")
    const [isFailed, setIsFailed] = useState(false)

    const { address } = useAuth();

    const closeFunc = () => {
        if (isSuccess) {
            setIsFailed(false);
            setIsSuccess(false);
            router.back();
        } else {
            setIsFailed(false);
            setIsSuccess(false);
        }
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const bindCode = async () => {
        console.log(inputValue);
        if (inputValue.length == 6) {
            try {
                await bindInviteCode(address, code);
                setIsSuccess(true);
            } catch (err) {
                setFaileText(err.message);
                setIsFailed(true)
            }
        } else {
            setFaileText("Please Input Correct Invite Code");
            setIsFailed(true);
        }
    }

    return (
        <>
            {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"+500 Points"} text={"Invitation code binding successful"} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Failed"} text={failedText} size={87} closeFunc={closeFunc} btn={"Ok"} />}

            <div className="px-8 py-4 flex flex-col gap-4 pb-28">
                <SubHeaderTri title={"Invite Code"} />

                <div className="flex flex-col gap-4 mt-6">
                    <label for="code" className="text-black text-lg dark:text-white">Enter your invite Code</label>
                    <input value={inputValue} onChange={handleChange} id="code" type="text" className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke placeholder:text-dao-gray px-4 py-2 rounded-[10px]" />
                    <button onClick={bindCode} className="bg-dao-green w-full p-2 text-white rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green">Submit</button>
                </div>
            </div>
        </>
    )
}