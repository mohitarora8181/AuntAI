import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut } from 'next-auth/react';
import DeveloperOptions from './DeveloperOptions';
import { useTheme } from 'next-themes';
import { LuSunMedium } from "react-icons/lu";
import { MdDarkMode } from "react-icons/md";



const SidePanel = ({ session, setDeveloperOptions }) => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [buttonClick , setButtonClick] = useState(false)


    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <div className='h-[98%] dark:bg-gradient-to-br dark:from-[#393939] dark:to-gray-800 dark:shadow-gray-600 max-sm:hidden flex flex-col w-[22%] bg-gradient-radial overflow-hidden from-gray-200 to-white self-center shadow-xl rounded-tr-2xl rounded-br-2xl drop-shadow-sm justify-start'>
            <div className='h-full w-full '>
                <div className='w-full p-5 flex justify-between text-black dark:text-black'>
                    <img className='h-[40px] mr-8 rounded-full' src={session?.user.image}></img>
                    {session ?
                        <button onClick={() => signOut()} className='bg-gray-200 dark:text-black h-9 border flex gap-2 hover:border-indigo-500 transition-all hover:shadow-2xl p-4 py-1 rounded-full'>
                            Sign Out
                        </button> :
                        <button disabled={buttonClick} onClick={() =>{ setButtonClick(true);signIn("google")}} className='bg-gray-200 dark:text-black h-9 border flex gap-2 hover:border-indigo-500 transition-all hover:shadow-2xl p-4 py-1 rounded-full disabled:cursor-wait disabled:opacity-50'>
                            Sign In
                            <FcGoogle className='self-center size-5' />
                        </button>
                    }
                </div>
                <div className='flex w-full p-6 justify-end'>
                    {mounted && <button onClick={() => { if (theme === "dark") { setTheme("light"); } else { setTheme("dark"); } }}>{theme && theme === "light" ? <MdDarkMode size={20} color='black' /> : <LuSunMedium size={20} color='white' />}</button>}
                </div>
            </div>
            <div className='mb-5 p-2'>
                <DeveloperOptions open={open} setOpen={setOpen} setDeveloperOptions={setDeveloperOptions} />
                <h6 onClick={() => { setOpen(!open) }} className={`text-sm select-none w-fit p-4 py-1 rounded-full text-gray-500  dark:bg-gray-200 hover:text-black font-thin cursor-pointer border border-gray-400 transition-all hover:border-black ${open ? "bg-white text-black font-semibold w-full text-center" : "bg-transparent text-gray-500 mx-4"}`}>{open ? "Close" : "Developer Options"}</h6>
            </div>
        </div>
    )
}

export default SidePanel
