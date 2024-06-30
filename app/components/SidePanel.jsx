import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut } from 'next-auth/react';
import DeveloperOptions from './DeveloperOptions';
import { useTheme } from 'next-themes';
import { LuSunMedium } from "react-icons/lu";
import { MdDarkMode } from "react-icons/md";
import database, { firestore } from '@firebase';
import { ref, set } from "firebase/database"
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { v1 as uuidv1 } from "uuid";


const SidePanel = ({ session, setDeveloperOptions, setList, setOpenAnimation, setChatID, chatID }) => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [buttonClick, setButtonClick] = useState(false)
    const [prevList, setprevList] = useState([]);
    const [unicode, setUnicode] = useState("");


    useEffect(() => {
        const fetchList = async () => {
            const docrefff = await getDocs(collection(firestore, unicode.toString()));
            setprevList([])
            docrefff.forEach((doc) => {
                setprevList((list) => [doc.id, ...list])
            })
            const docRef = doc(firestore, unicode.toString(), chatID);
            await getDoc(docRef).then((snap) => {
                if (snap.exists()) {
                    reframeData(snap.data());
                    setOpenAnimation(false);
                }
            })
        }

        if (unicode) {
            fetchList();
        }
    }, [unicode])

    useEffect(() => {
        if (!prevList.includes(chatID) && chatID) {
            setprevList((list) => [chatID, ...list])
        }
    }, [prevList, chatID])


    const handleGetUpdatedChat = async (item) => {
        setChatID(item)
        setList([])
        const docRef = doc(firestore, unicode.toString(), item);
        await getDoc(docRef).then((snap) => {
            if (snap.exists()) {
                reframeData(snap.data());
            }
            setOpenAnimation(false);
        })
        localStorage.setItem("current-ChatID", item);
    }

    const reframeData = (obj) => {
        const data = Object.entries(obj).sort();
        const pushed = [];
        data.map((d) => {
            pushed.push(d[1]);
        })
        setList(pushed)
    }


    useEffect(() => {
        if (session) {
            let user = (session?.user.email).split("@")[0];
            user = user.replaceAll(".", "").replaceAll("#", "").replaceAll("[", "").replaceAll("]", "");
            let uni = "";
            for (let i = 0; i < user.length; i++) {
                uni += user.charCodeAt(i)
            }
            session.user.auntID = uni;
            set(ref(database, "users/" + user), session.user);
            setUnicode(uni);
        }
        setMounted(true);
    }, [session])

    const handleNewChat = () => {
        setOpenAnimation(true);
        const date = new Date();
        const unid = (date.toDateString() + "*=*" + date.toLocaleTimeString() + "*=*" + uuidv1());
        setList([]);
        setChatID(unid);
        localStorage.setItem("current-ChatID", unid);
        setprevList((list) => [unid, ...list]);
        setOpenAnimation(false)
    }

    return (
        <div className='h-[98%] dark:bg-gradient-to-br dark:from-[#393939] dark:to-gray-800 dark:shadow-gray-600 max-sm:hidden flex flex-col w-[22%] bg-gradient-radial overflow-hidden from-gray-200 to-white self-center shadow-xl rounded-tr-2xl rounded-br-2xl drop-shadow-sm justify-start'>
            <div className='h-full w-full '>
                <div className='w-full p-5 flex justify-between text-black dark:text-black'>
                    <img className='h-[40px] mr-8 rounded-full' src={session?.user.image}></img>
                    {session ?
                        <button onClick={() => signOut()} className='bg-gray-200 dark:text-black h-9 border flex gap-2 hover:border-indigo-500 select-none transition-all hover:shadow-2xl p-4 py-1 rounded-full'>
                            Sign Out
                        </button> :
                        <button disabled={buttonClick} onClick={() => { setButtonClick(true); signIn("google") }} className='bg-gray-200 select-none dark:text-black h-9 border flex gap-2 hover:border-indigo-500 transition-all hover:shadow-2xl p-4 py-1 rounded-full disabled:cursor-wait disabled:opacity-50'>
                            Sign In
                            <FcGoogle className='self-center size-5' />
                        </button>
                    }
                </div>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex p-6 justify-between'>
                        {session && <button className='p-1 px-3 border hover:border-indigo-600 hover:shadow-2xl bg-gray-200 text-black rounded-full transition-all' onClick={handleNewChat}>New Chat</button>}
                        {mounted && <button className='border p-1 px-1.5 dark:border-white border-black rounded-full' onClick={() => { if (theme === "dark") { setTheme("light"); } else { setTheme("dark"); } }}>{theme && theme === "light" ? <MdDarkMode size={20} color='black' /> : <LuSunMedium size={20} color='white' />}</button>}
                    </div>
                    <ul className='mb-10 overflow-y-scroll h-[69%] w-full scrollbar-thin transition-all'>
                        {prevList && session && prevList.map((item, index) => {
                            return <li key={index} className={`m-3 select-none transition-all flex flex-col text-black dark:text-white text-sm cursor-pointer rounded-xl border border-gray-400 p-5 ${(chatID == item) ? "bg-gray-300 dark:bg-gray-950" : "bg-inherit hover:bg-gray-200 dark:hover:bg-gray-900 dark:bg-gray-800"}`} onClick={() => { if (chatID == item) return; setList([]); setOpenAnimation(true); setChatID(item); handleGetUpdatedChat(item); }}>
                                <h1 className='text-lg'>{item.split("*=*")[0]}</h1>
                                <p className='text-sm self-end'>{item.split("*=*")[1]}</p>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <div className={`p-3 ${open ? "h-full" : "h-auto bottom-0"} flex flex-col justify-end absolute w-full`}>
                <DeveloperOptions open={open} setOpen={setOpen} setDeveloperOptions={setDeveloperOptions} />
                <h6 onClick={() => { setOpen(!open) }} className={`text-sm select-none w-fit p-4 py-1 rounded-full text-gray-500  dark:bg-gray-200 hover:text-black font-thin cursor-pointer border border-gray-400 transition-all hover:border-black ${open ? "bg-white text-black font-semibold w-full text-center" : "bg-transparent text-gray-500 mx-4"}`}>{open ? "Close" : "Developer Options"}</h6>
            </div>
        </div>
    )
}

export default SidePanel
