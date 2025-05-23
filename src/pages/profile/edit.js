import { SubHeaderTri } from "@/components/accessories"
import { ProfileCard } from "@/components/cards"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"

export default function ProfileEdit() {
    const { userProfile } = useAuth();

    return (
        <>
            <div className="px-8 py-4">
                <SubHeaderTri title={"Edit"} />

                <div className="flex flex-col gap-4 mt-6">
                    <div className="bg-dao-green p-4 rounded-xl flex flex-col gap-2 items-center justify-center mb-4">
                        <Image src={"/Ellipse 223.png"} width={55} height={55} alt="" />
                        <h2 className="text-white text-lg font-semibold">{userProfile.name}</h2>
                    </div>

                    <ProfileCard title={"Modify Name"} link={"/profile/modify-name"} />
                    <ProfileCard title={"Change Avatar"} link={"/profile/change-avatar"} />
                </div>
            </div>
        </>
    )
}