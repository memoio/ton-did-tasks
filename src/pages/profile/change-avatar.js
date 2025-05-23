import { SubHeader } from "@/components/accessories";
import { AlertCard } from "@/components/cards";
import { useState, useRef } from "react";
import Image from "next/image";

export default function InviteCode() {
    const [isSuccess, setIsSuccess] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isFailed, setIsFailed] = useState(false);
    const [failedText, setFailedText] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result);
                };
                reader.readAsDataURL(file);
                setSelectedFile(file);
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

    const closeFunc = () => {
        setIsSuccess(false)
        setIsFailed(false)
    }

    return (
        <>
            {isSuccess && <AlertCard image={"/Frame 34643-g.svg"} title={"+200 Points"} text={"Invitation code binding successful"} size={87} closeFunc={closeFunc} btn={"Ok"} />}
            {isFailed && <AlertCard image={"/Frame 34643-x.svg"} title={"Not Support"} text={failedText} size={87} closeFunc={closeFunc} />}

            <div className="px-8 py-4 flex flex-col gap-4 pb-28">
                <SubHeader title={"Change Avatar"} />

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

                    <button onClick={() => setIsFailed(true)} className="bg-dao-green w-full p-2 text-white rounded-full dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green">Submit</button>
                </div>
            </div>
        </>
    )
}