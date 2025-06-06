import { SubHeader } from "@/components/accessories";
import { AlertCard } from "@/components/cards";
import { useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { changeAvatar } from "@/components/api/profile";

export default function InviteCode() {
    const { address, setUserAvatar } = useAuth();

    const [isSuccess, setIsSuccess] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isFailed, setIsFailed] = useState(false);
    const [failedText, setFailedText] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
            if (ALLOWED_TYPES.includes(file.type)) {
                if (file.size <= 5 * 1024 * 1024) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPreviewUrl(reader.result);
                    };
                    reader.readAsDataURL(file);
                    setSelectedFile(file);
                } else {
                    setFailedText("File size cannot exceed 5MB");
                    setIsFailed(true);
                }
            } else {
                setFailedText("Please choose png/jpg/jpeg/gif file");
                setIsFailed(true);
            }
        }
    };

    const handleClearFile = (e) => {
        e?.stopPropagation();
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleSubmit = async () => {
        if (selectedFile) {
            try {
                setIsUpload(true);
                const avatarUrl = await changeAvatar(address, selectedFile);

                console.log(avatarUrl);
                setUserAvatar(avatarUrl);
                setIsUpload(false);
                setIsSuccess(true);
                setSelectedFile(false);
            } catch (err) {
                setFailedText(err.message);
                setIsFailed(true);
            } finally {
                setIsUpload(false);
            }
        }
    }

    const closeFunc = () => {
        setIsSuccess(false)
        setIsFailed(false)
    }

    return (
        <>
            {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"Set Avatar Success"} text={"Set user avatar successful"} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Set Avatar Failed"} text={failedText} size={87} closeFunc={closeFunc} btn={"Ok"} />}

            <SubHeader title={"Change Avatar"} />
            <div className="px-8 pt-18 flex flex-col gap-4 pb-28">

                <div className="flex flex-col gap-4 mt-6">
                    <label for="file" className="text-black text-lg dark:text-white">Choose from my gallery</label>
                    <div className="relative border border-dashed border-dao-green w-full h-24 cursor-pointer flex items-center justify-center">
                        <input id="file" name="file" type="file" disabled={previewUrl !== null} ref={fileInputRef} onChange={handleFileChange} className="absolute inset-0 z-10 opacity-0 cursor-pointer z-10" />
                        {previewUrl ? (
                            <div className="w-36 h-24 relative flex items-center justify-center">
                                <Image src={previewUrl} className='max-h-full max-w-full object-contain' width={90} height={90} alt="Preview" />
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleClearFile();
                                }} className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-70 transition z-20">×</button>
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" className="fill-dao-yellow size-8 absolute top-1/2 -translate-y-1/2 inset-x-0 mx-auto"><path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" /></svg>
                        )}
                    </div>

                    {selectedFile && (
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                        </div>
                    )}

                    <button onClick={handleSubmit} disabled={isUpload} className={`button_primary text-dao-green w-full p-2 rounded-full flex items-center justify-center ${isUpload ? 'opacity-75 cursor-not-allowed' : ''}`}>
                        {isUpload ? (
                            <svg className="animate-spin h-6 w-6 text-dao-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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