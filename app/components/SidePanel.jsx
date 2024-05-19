import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut } from 'next-auth/react';
import DeveloperOptions from './DeveloperOptions';


const SidePanel = ({ session, setDeveloperOptions }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='h-[98%] max-sm:hidden flex flex-col w-[22%] bg-gradient-radial overflow-hidden from-gray-200 to-white self-center shadow-xl rounded-tr-2xl rounded-br-2xl drop-shadow-sm justify-between'>
            <div className='w-full p-5 flex justify-between'>
                <img className='h-[40px] mr-8 rounded-full' src={session?.user.image}></img>
                {session ?
                    <button onClick={() => signOut()} className='bg-gray-200 h-9 border flex gap-2 hover:border-indigo-500 transition-all hover:shadow-2xl p-4 py-1 rounded-full'>
                        Sign Out
                    </button> :
                    <button onClick={() => signIn("google")} className='bg-gray-200 h-9 border flex gap-2 hover:border-indigo-500 transition-all hover:shadow-2xl p-4 py-1 rounded-full'>
                        Sign In
                        <FcGoogle className='self-center size-5' />
                    </button>
                }
            </div>
            <div className='mb-5 p-2'>
                <DeveloperOptions open={open} setOpen={setOpen} setDeveloperOptions={setDeveloperOptions} />
                <h6 onClick={() => { setOpen(!open) }} className={`text-sm select-none w-fit p-4 py-1 rounded-full text-gray-500 hover:text-black font-thin cursor-pointer border border-gray-400 transition-all hover:border-black ${open ? "bg-white text-black font-semibold w-full text-center" : "bg-transparent text-gray-500"}`}>{open ? "Close" : "Developer Options"}</h6>
            </div>
        </div>
    )
}

export default SidePanel
