import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

export default function Game () {
    const router = useRouter();
    
    const [timeLeft, setTimeLeft] = useState(3)
    const [actionId, setActionId] = useState(1)
    const [points, setPoints] = useState(0)
    const [clickCount, setClickCount] = useState(0)
    
    const [isLoaded, setIsLoaded] = useState(false)

    const pointsRef = useRef(null);
    const reloader = useRef(null)
    const gameA = useRef(null)
    const gameB = useRef(null)
    const gameC = useRef(null)
    const gameO = useRef(null)

    const userFriendlyAddress = "UQCmI8BIBn55Np77OlwHMK5SqBAknRdLxvb7MqKHMBlMSSjB"//useTonAddress()

    useEffect(() => {
        const getPoints = async () => {
            const checkGamePoints = await fetch(`https://data-be.metamemo.one/game/user/info?address=${userFriendlyAddress}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await checkGamePoints.json()
            if ( data.result == 1 ) {
                setPoints(data.data.points)
                reloader.current.classList.add('hidden')
                reloader.current.classList.remove('block')
            } 
        }

        if ( userFriendlyAddress) {
            getPoints()
        }
    }, [userFriendlyAddress])

    const gameClick = (pos) => {
        const getPoints = async () => {
            reloader.current.classList.add('block')
            reloader.current.classList.remove('hidden')

            const checkGamePoints = await fetch(`https://data-be.metamemo.one/game/points/add?address=${userFriendlyAddress}&actionid=${actionId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"address": userFriendlyAddress, "actionid": actionId})
            })

            const data = await checkGamePoints.json()

            if ( data.result == 1 ) {
                setPoints(data.data.total_points)
                reloader.current.classList.add('hidden')
                reloader.current.classList.remove('block')
            }

            if ( data.result != 1 ) {
                newElement.textContent = 'Error!';
                newElement.className = "fade-element"; // Add a class for styling
                pos == 'left'? newElement.className = "w6u9j6 absolute grobold text-xl text-red-500 left-0": newElement.className = "w6u9j6 absolute grobold text-xl text-red-500 right-0"; // Add a class for styling

                pointsRef.current.appendChild(newElement)
                // Fade out and remove after 2 seconds
                setTimeout(() => {
                    newElement.style.opacity = "0";
                    newElement.style.transform = "translateY(-12rem)";
                }, 0);

                setTimeout(() => {
                    if (newElement.parentNode) {
                        newElement.remove();
                    }
                }, 2000);
            }            
        }

        if ( clickCount < 5000 && timeLeft > 0 ) {
            const newElement = document.createElement("p");
            
            newElement.textContent = `+${actionId * 100}`;
            newElement.className = "fade-element";
            pos == 'left'? newElement.className = "w6u9j6 absolute text-xl text-dao-green left-0 z-10 font-semibold": newElement.className = "w6u9j6 absolute grobold text-xl text-[#FBCC18] right-0 font-semibold"; // Add a class for styling            
            
            setClickCount((prev) => prev+(actionId*100))
            
            pointsRef.current.appendChild(newElement)

            setTimeout(() => {
                if (newElement.parentNode) {
                newElement.style.opacity = "0";
                newElement.style.transform = "translateY(-13rem)";
                }
            }, 0);
            
            setTimeout(() => {
                if (newElement.parentNode) {
                    //newElement.remove();
                }
            }, 2000);
            
            getPoints()
        }
    }

    const pushPage = () => {
        router.push('/home')
    }

    const reset = () => {
        setClickCount(0)
        setTimeLeft(30)
    }

    useEffect(() => {
        if (timeLeft <= 0 || clickCount === 5000) {
            gameA.current.classList.add('hidden');
            gameB.current.classList.add('hidden');
            gameC.current.classList.add('invisible');
            gameO.current.classList.add('flex');

            gameA.current.classList.remove('flex');
            gameB.current.classList.remove('flex');
            gameO.current.classList.remove('hidden');
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup function
    }, [timeLeft]);

    return (
        <>
            <button onClick={ pushPage } className="fixed top-8 left-8 bg-dao-green p-1 rounded z-20"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFF" className="size-5"><path d="m274-450 227 227q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-459q-5-5-7-10t-2-11q0-6 2-11t7-10l278-278q9-9 21-9t21 9q9 9 9 21t-9 21L274-510h496q13 0 21.5 8.5T800-480q0 13-8.5 21.5T770-450H274Z"/></svg></button>
            
            <div ref={ gameA } className="fixed inset-x-8 top-18 p-4 rounded-xl bg-dao-green flex gap-4 items-center z-10 text-white dark:bg-sec-bg dark:shadow-md dark:shadow-dao-green">
                <Image src={"Clip path group.svg"} width={29.49} height={34.12} alt="" />
                <div className="flex flex-col min-w-1/2">
                    <p className="">Game points</p> 
                    <p className="text-sm uppercase">dID1234!</p> 
                </div>
                <p className="text-[#FBCC18] text-right w-full flex items-center gap-1 justify-end">{ points }<svg ref={ reloader } xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FBCC18" className="size-4 animate-spin hidden"><path d="M220-477q0 63 23.5 109.5T307-287l30 21v-94q0-13 8.5-21.5T367-390q13 0 21.5 8.5T397-360v170q0 13-8.5 21.5T367-160H197q-13 0-21.5-8.5T167-190q0-13 8.5-21.5T197-220h100l-15-12q-64-51-93-111t-29-134q0-94 49.5-171.5T342-766q11-5 21 0t14 16q5 11 0 22.5T361-710q-64 34-102.5 96.5T220-477Zm520-6q0-48-23.5-97.5T655-668l-29-26v94q0 13-8.5 21.5T596-570q-13 0-21.5-8.5T566-600v-170q0-13 8.5-21.5T596-800h170q13 0 21.5 8.5T796-770q0 13-8.5 21.5T766-740H665l15 14q60 56 90 120t30 123q0 93-48 169.5T623-195q-11 6-22.5 1.5T584-210q-5-11 0-22.5t16-17.5q65-33 102.5-96T740-483Z"/></svg></p>
            </div>

            <div ref={ gameB } className="fixed inset-x-8 bottom-8 p-4 rounded-xl shadow-md shadow-dao-green/50 flex gap-4 items-center justify-between z-10 bg-dao-green dark:bg-fill-bright/19 dark:border dark:border-solid dark:border-fill-bright">
                <div className="flex gap-4">
                    <Image src={"Clip path group-clock.svg"} width={35.19} height={43} alt="" />
                    <div className="flex flex-col min-w-1/2">
                        <p className="">Time Remaining</p> 
                        <p className="text-fill-bright text-sm uppercase">{ timeLeft }s</p> 
                    </div>
                </div>
                <button onClick={ reset } type="reset"><Image src={"Group 34604.svg"} className="size-8" width={36} height={36} alt="" /></button>
            </div>

            <div ref={ gameC } className="min-h-svh min-w-screen flex justify-center items-center relative mt-12">
                <div className="relative w-full">
                    <div className="absolute inset-0 grid grid-cols-2 z-20">
                        <button onClick={ () => gameClick('left') }></button>
                        <button onClick={ () => gameClick('right') }></button>
                    </div>

                    <div className="relative w-fit mx-auto">
                        <Image src={"/Group 34528.png"} className="mx-auto scale-150" width={215} height={215} alt="" />
                        <Image src={"/Group 34531.svg"} className="absolute right-8 bottom-4" width={49} height={53.03} alt="" />
                    </div>
                    
                    <div ref={pointsRef} className="w-1/2 mx-auto relative">
                    </div>

                    <div className="w-full px-12 flex flex-col items-end gap-2 mt-12">
                        <div className="w-full h-5 bg-light-gray rounded-full">
                            <div className="min-w-5 h-5 rounded-full bg-dao-green" style={{width: `calc(${(clickCount/5000)*100}%)`}}></div>
                        </div>

                        <div className="flex gap-2">
                            <Image src={"Group 34527.svg"} width={21} height={21} alt="" />
                            <p className="grobold text-dao-yellow font-black relative top-0.5 text-xl">{ clickCount }/<span className="text-black dark:text-white">5000</span></p>
                        </div>
                    </div>
                </div>

                
            </div>

            <div ref={ gameO } className="min-h-svh min-w-screen hidden flex-col justify-center items-center p-8 fixed z-10 inset-0 vr56syh">
                <div className="fixed inset-0 bg-white">
                    <div className="bg-black/60 fixed inset-0"></div>
                </div>
                <div className="flex flex-col gap-4 bg-white w-full p-8 rounded-xl text-center relative border-2 border-solid border-black dark:bg-sec-bg dark:border-dark-stroke">
                    <div className="p-2 size-28 bg-white border border-solid border-light-stroke rounded-full flex items-center justify-center absolute -top-16 inset-x-0 mx-auto dark:bg-sec-bg"><Image src={"/image-removebg-preview (8).png"} className="mx-auto aspect-square object-contain" width={500} height={500} alt="" /></div>
                    <h1 className="text-2xl font-semibold mt-8 text-black dark:text-white">Game Over</h1>
                    { clickCount == 5000 && timeLeft <= 0? <p className="text-dao-gray dark:text-white">Great job! You just earned { clickCount } points!</p>: 
                    <p className="text-dao-gray dark:text-white">You only earned { clickCount } points!</p> }
                    <button onClick={ () => router.reload() } className="bg-dao-green rounded-full px-6 w-fit py-2 mx-auto flex gap-2 items-center text-white dark:bg-sec-bg dark:border-y-2 dark:border-solid dark:border-dao-green"><Image src={"tabler_reload.svg"} width={24} height={24} alt="" />Play Again</button>
                </div>
            </div>
        </>
    )
}