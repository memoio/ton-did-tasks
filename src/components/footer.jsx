import Image from "next/image";
import Link from "next/link";

export function Footer ( props ) {
    return (
        <section className="px-8 w-full fixed bottom-0 pb-8 bg-white dark:bg-transparent pt-2">
            <footer className="bg-white w-full mx-auto grid grid-cols-5 py-2 inset-x-4 z-30 gap-4 items-end dark:bg-white/5 dark:border dark:border-solid dark:border-white/10 dark:pb-2 dark:rounded-lg dark:bottom-6 backdrop-blur-xs">
                { props.active == 'home'? <FooterKey title={"Home"} image={"/ic_outline-home-active.svg"} active={true} url={"/home"} />: <FooterKey title={"Home"} image={"/ic_outline-home.svg"} url={"/home"} active={false} /> } 
                { props.active == 'did'? <FooterKey title={"DID"} image={"/ant-design_idcard-outlined-active.svg"} active={true} />: <FooterKey title={"DID"} image={"/ant-design_idcard-outlined.svg"} url={"/did"} active={false} /> }
                { props.active == 'earning'? <FooterKey title={"Earning"} image={"/mingcute_coin-2-line-active.svg"} active={true} />: <FooterKey title={"Earning"} image={"/mingcute_coin-2-line.svg"} url={"/earning"} active={false} /> }
                { props.active == 'referral'? <FooterKey title={"Referral"} image={"/material-symbols-light_box-add-sharp-active.svg"} active={true} />: <FooterKey title={"Referral"} image={"/material-symbols-light_box-add-sharp.svg"} url={"/referral"} active={false} /> }
                { props.active == 'profile'? <FooterKey title={"Profile"} image={"/iconamoon_profile-light-active.svg"} active={true} />: <FooterKey title={"Profile"} image={"/iconamoon_profile-light.svg"} url={"/profile"} active={false} /> }
            </footer>
        </section>
    )
}

export function FooterKey ( props ) {
    let width = 21;
    let height = 21;
    if ( props.title === "Daily Check In" ) {
        width = 33
        height = 34
    } if ( props.title === "Friends" ) {
        width = 29
        height = 30
    }

    return (
        <Link href={ props.url? props.url: '#' }>
            <div className="flex flex-col gap-1 items-center relative">
                <Image src={ props.image} className="w-3/5" width={width} height={height} alt="" />

                { props.active?
                    <p className="text-dao-green w-3/4 mx-auto text-xs text-center">{ props.title }</p>
                :
                    <p className="text-dao-gray w-3/4 mx-auto text-xs text-center">{ props.title }</p>
                }
            </div>
        </Link>
    )
}