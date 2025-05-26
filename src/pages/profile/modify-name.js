import { SubHeader } from "@/components/accessories";
import { AlertCard, CheckInCard } from "@/components/cards";
import { useState } from "react";
import { changeName } from "@/components/api/profile";
import { useAuth } from "@/context/AuthContext";

export default function InviteCode() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [failedText, setFailedText] = useState("");
    const [isUpload, setIsUpload] = useState(false);
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
                setIsUpload(true);
                await changeName(address, name);

                setIsSuccess(true);
                setUserName(name);
                setIsUpload(false);
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
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={failedText} size={87} closeFunc={closeFunc} btn={"Ok"} />}

            <div className="px-8 py-4 flex flex-col gap-4 pb-28">
                <SubHeader title={"Modify Name"} />

                <div className="flex flex-col gap-4 mt-6">
                    <label for="code" className="text-black text-lg dark:text-white">Enter your new name</label>
                    <input onChange={handleChange} id="code" type="text" className="bg-main-blue/8 border border-solid border-main-blue/21 dark:bg-sec-bg dark:border-dark-stroke placeholder:text-dao-gray px-4 py-2 rounded-[10px]" placeholder="Enter" />
                    <button onClick={handleSetName} disabled={isUpload} className={`bg-dao-green w-full p-2 text-white rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green flex items-center justify-center ${isUpload ? 'opacity-75 cursor-not-allowed' : ''}`}>
                        {isUpload ? (
                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}