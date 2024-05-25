import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useEffect, useState } from "react";
import { RiImageEditFill } from "react-icons/ri";
import { Tooltip, IconButton } from "@mui/material";
import ImageGenerator from "./ImageGenerator";


const RequestButton = ({ prompt, setPrompt, setList, seedValue, setLoading, loading, developerOptions, setOpenAnimation }) => {

    const [history, setHistory] = useState([]);
    const [genOpen, setGenOpen] = useState(false);

    const handleProcess = async (e) => {
        setOpenAnimation(false)
        e.preventDefault();
        if (prompt.trim() != "") {
            setList((list) => [...list, { content: e.target.value, role: "user" }])
            setHistory((history) => [...history, { role: "user", parts: [{ text: prompt }] }]);
            setLoading(true);
            setPrompt("");

            if (developerOptions.model.includes("gemini")) {
                await axios.post("/api/gemini", {
                    prompt,
                    developerOptions,
                    history
                }).then(({ data }) => {
                    setLoading(false);
                    data && setHistory((history) => [...history, data]);
                    setList((list) => [...list, { content: data ? data.parts[0].text : "", role: "assistant" }]);
                })

            } else {
                await axios.post("/api/response", {
                    prompt,
                    developerOptions,
                    seedValue
                }).then(({ data }) => {
                    setLoading(false);
                    setList((list) => [...list, data?.message]);
                });
            }
        }
    }

    const handleKeypress = (e) => {
        if (window.screen.width < 500) {
            return;
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            handleProcess(e);
        }
    }

    useEffect(() => {
        (document.querySelector("textarea")).focus();
    }, [loading])

    useEffect(() => {
        setTimeout(() => {
            setOpenAnimation(false);
        }, 2000)
    }, []);

    return (
        <form className='flex justify-center absolute w-[78%] h-[6rem] bottom-4'>
            <ImageGenerator isOpen={genOpen} setGenOpen={setGenOpen} />
            <div className='w-[95%] max-sm:px-3 p-5 flex justify-between align-middle'>
                <textarea className={`border text-black disabled:bg-gray-50 bg-white placeholder-gray-400 scrollbar-none pr-16 border-black border-opacity-10 resize-none outline-none w-full p-3 pl-6 rounded-full align-middle shadow-lg dark:shadow-gray-900 shadow-gray-100 ${loading ? "cursor-none" : "cursor-text"}`}
                    type='text'
                    value={prompt}
                    spellCheck
                    autoFocus
                    onChange={(e) => { setPrompt(e.target.value) }} placeholder='Enter a prompt here'
                    onKeyDown={handleKeypress}
                    disabled={loading}
                ></textarea>
                <div className={`${loading ? "px-0" : "px-3"} overflow-hidden self-center -ml-20 mx-2 w-[3rem] h-[3rem] max-sm:h-[2.5rem] max-sm:w-[2.5rem] cursor-pointer border-none rounded-full hover:opacity-50 flex justify-center gap-x-2`} onClick={handleProcess}>
                    <button className={`text-2xl select-none ${prompt ? "block animate-slideIn" : "hidden"}`}>
                        <IoSend className='self-center text-gray-800 select-none -rotate-[30deg]' />
                    </button>
                    {!loading && <Tooltip title="Generate Image" placement="top" className={prompt ? "hidden" : "block"}>
                        <IconButton onClick={() => setGenOpen(true)} className="cursor-pointer text-gray-600 size-10 mt-1">
                            <RiImageEditFill />
                        </IconButton>
                    </Tooltip>}
                    {loading && <dotlottie-player src="animations/square_loader.json" background="transparent" speed="1" style={{ width: "100%", height: "100%" }} loop autoplay></dotlottie-player>}
                </div>
            </div>
        </form>
    )
}

export default RequestButton
