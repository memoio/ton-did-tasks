import { SubHeaderTri } from "@/components/accessories";
// import { DidMint } from "@/components/accessories";
import { AlertCard, CheckInCard } from "@/components/cards";
// import { Footer } from "@/components/footer";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
import { useState } from "react";
// import { DailyTask } from "@/components/cards";
// import { TelegramLogoIconBW, TwitterLogoIcon } from "@/components/icons";
import { changeName } from "@/components/api/profile";
import { useAuth } from "@/context/AuthContext";

export default function InviteCode() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [failedText, setFailedText] = useState("");
    const [name, setName] = useState("");

    const { address, userProfile, setUserName } = useAuth();

    const closeFunc = () => {
        setIsSuccess(false);
        setIsFailed(false);
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSetName = async () => {
        if (name === "") {
            setFailedText("name cannot be empty");
            setIsFailed(true);
        } else if (userProfile.name !== name) {
            try {
                console.log(name);
                await changeName(address, name);

                setIsSuccess(true);
                setUserName(name);
            } catch (err) {
                console.log(err);
                setFailedText(err.message);
                setIsFailed(true);
            }
        } else {
            setFailedText("Please enter a name different from the current name");
            setIsFailed(true);
        }
    }

    return (
        <>
            {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"Modify Name Success"} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={failedText} size={87} closeFunc={closeFunc} />}

            <div className="px-8 py-4 flex flex-col gap-4 pb-28">
                <SubHeaderTri title={"Modify Name"} />

                <div className="flex flex-col gap-4 mt-6">
                    <label for="code" className="text-black text-lg dark:text-white">Enter your new name</label>
                    <input onChange={handleChange} id="code" type="text" className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke placeholder:text-dao-gray px-4 py-2 rounded-[10px]" placeholder="Enter" />
                    <button onClick={handleSetName} className="bg-dao-green w-full p-2 text-white rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green">Submit</button>
                </div>
            </div>
        </>
    )
}