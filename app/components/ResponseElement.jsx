import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeFormat from "rehype-format"
import rehypeRaw from "rehype-raw"

import { LuClipboardCopy } from "react-icons/lu";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { CopyToClipboard } from "react-copy-to-clipboard";

import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from "react-toastify";
import { RxSpeakerLoud } from "react-icons/rx";
import { useEffect, useState } from "react";

const ResponseElement = ({ list, session,chatID }) => {

    const [isPlaying, setisPlaying] = useState(false);
    const [currentPlayingIndex, setcurrentPlayingIndex] = useState(null);
    const [voice, setVoice] = useState();

    const handleRead = (text) => {
        const synth = window.speechSynthesis;
        setisPlaying(true);
        const utterence = new SpeechSynthesisUtterance(text.replaceAll("</assistant>", ""));
        if (voice) {
            utterence.voice = voice;
            synth.speak(utterence);
        } else {
            setTimeout(() => {
                setVoice(synth.getVoices()[12]);
                utterence.voice = synth.getVoices()[12];
                synth.speak(utterence);
            }, 1000);
        }
        utterence.onend = () => {
            setisPlaying(false)
        }
    }

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setisPlaying(false)
        setcurrentPlayingIndex(null)
    }

    useEffect(() => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setisPlaying(false)
        setcurrentPlayingIndex(null)
    }, [chatID]);

    return (
        list.map((ele, index) => {
            return <>
                {ele?.role == "assistant" && <img key={"imgAssistant-" + index} className='h-[40px] ml-8 max-sm:mt-5 max-sm:ml-1 rounded-full self-start -mb-12' src={process.env.NEXT_PUBLIC_RESPONSE_IMG}></img>}
                <li className={`w-auto max-sm:text-sm max-w-[60%] max-sm:max-w-[80%] mx-[5rem] max-sm:mx-[3rem] my-6 max-sm:my-4 ${ele?.role == "user" ? "self-end rounded-tr-sm" : "self-start rounded-tl-sm"} bg-[#dee0e2] rounded-xl`} key={"item-" + index}>
                    {
                        (ele?.content)?.includes("```") ?
                            (ele?.content.split("```")).map((codeEle, ind) => {
                                if (SyntaxHighlighter.supportedLanguages.indexOf(codeEle.split("\n")[0]) > 0) {
                                    return (<div className="w-full flex flex-col" key={"codeBox-" + index + ind}>
                                        <CopyToClipboard key={"copyBtn-" + index + ind} onCopy={() => toast.success("Code copied successfully")}
                                            children={
                                                <span className="self-end max-sm:text-xs flex gap-1.5 text-sm text-white bg-gray-600 mr-5 p-2 py-1 rounded-full cursor-pointer hover:opacity-70">
                                                    Copy
                                                    <LuClipboardCopy className="self-center size-4" />
                                                </span>
                                            }
                                            text={codeEle.slice(codeEle.indexOf("\n") + 1)}
                                        />
                                        <SyntaxHighlighter
                                            key={"code" + index + ind}
                                            className="rounded-lg m-5 mt-1"
                                            wrapLongLines
                                            language={codeEle.split("\n")[0]}
                                            style={a11yDark}>
                                            {codeEle}
                                        </SyntaxHighlighter>
                                    </div>
                                    );
                                } else {
                                    return (
                                        <Markdown key={"code-" + index + ind} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeFormat, rehypeRaw]} className={`p-3 text-wrap scrollbar-none overflow-x-scroll text-black dark:text-black mx-5 px-2 my-1 rounded-lg rounded-tl-2xl rounded-br-2xl ${ele?.role == "user" ? "text-end" : "text-start"}`}>
                                            {codeEle}
                                        </Markdown>
                                    );
                                }
                            }) :
                            <Markdown key={"normalResponse-" + index} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeFormat, rehypeRaw]} className={`p-3 text-wrap scrollbar-none overflow-x-scroll mx-5 px-2 my-1 text-black dark:text-black rounded-lg rounded-tl-2xl rounded-br-2xl ${ele?.role == "user" ? "text-end" : "text-start"}`}>
                                {ele?.content}
                            </Markdown>
                    }
                </li>
                {ele?.role == "assistant" && !(ele?.content)?.includes("```") && <button disabled={isPlaying && currentPlayingIndex != index} key={index} className={`self-start dark:bg-gray-400 transition-all flex gap-2 -mt-12 ml-10 max-sm:ml-2 hover:bg-black hover:text-white cursor-pointer p-2 rounded-full disabled:cursor-wait ${isPlaying && currentPlayingIndex == index ? "bg-black" : "bg-gray-100"}`} onClick={() => { isPlaying && currentPlayingIndex == index ? handlePause() : handleRead(ele?.content); setcurrentPlayingIndex(index) }}>
                    {isPlaying && currentPlayingIndex == index ? <dotlottie-player src="animations/voice_lines.json" background="transparent" speed="0.5" style={{ width: "20px", height: "20px" }} loop autoplay></dotlottie-player>
                        : <RxSpeakerLoud className="self-center" />}
                </button>}
                {ele?.role == "user" && <img key={"imgUser-" + index} className='h-[40px] mr-8 max-sm:mr-1 mb-0 max-sm:mb-5 rounded-full self-end -mt-16 max-sm:-mt-20' src={session?.user.image}></img>}
            </>
        })
    )
}

export default ResponseElement
