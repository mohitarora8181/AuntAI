import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeFormat from "rehype-format"
import rehypeRaw from "rehype-raw"

import { LuClipboardCopy } from "react-icons/lu";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { CopyToClipboard } from "react-copy-to-clipboard";

import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from "react-toastify";

const ResponseElement = ({ list, session }) => {
    return (
        list.map((ele, index) => {
            return <>
                {ele.role == "assistant" && <img className='h-[40px] ml-8 rounded-full self-start -mb-12' src={process.env.NEXT_PUBLIC_RESPONSE_IMG}></img>}
                <li className={`w-auto max-w-[60%] mx-[5rem] my-3 ${ele.role == "user" ? "self-end rounded-tr-sm" : "self-start rounded-tl-sm"} bg-[#dee0e2] rounded-xl`}
                    key={index}>
                    {
                        (ele.content)?.includes("```") ?
                            (ele.content.split("```")).map((codeEle, ind) => {
                                if (SyntaxHighlighter.supportedLanguages.indexOf(codeEle.split("\n")[0]) > 0) {
                                    return (<div className="w-full flex flex-col">
                                        <CopyToClipboard onCopy={() => toast.success("Code copied successfully")}
                                            children={
                                                <span className="self-end flex gap-1.5 text-sm text-white bg-gray-600 mr-5 p-2 py-1 rounded-full cursor-pointer hover:opacity-70">
                                                    Copy
                                                    <LuClipboardCopy className="self-center size-4" />
                                                </span>
                                            }
                                            text={codeEle.slice(codeEle.indexOf("\n") + 1)}
                                        />
                                        <SyntaxHighlighter
                                            key={"code" + ind}
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
                                        <Markdown key={"code" + ind} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeFormat, rehypeRaw]} className={`p-3 text-wrap scrollbar-none overflow-x-scroll mx-5 px-2 my-1 rounded-lg rounded-tl-2xl rounded-br-2xl ${ele.role == "user" ? "text-end" : "text-start"}`}>
                                            {codeEle}
                                        </Markdown>
                                    );
                                }
                            }) :
                            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeFormat, rehypeRaw]} className={`p-3 text-wrap scrollbar-none overflow-x-scroll mx-5 px-2 my-1 rounded-lg rounded-tl-2xl rounded-br-2xl ${ele.role == "user" ? "text-end" : "text-start"}`}>
                                {ele.content}
                            </Markdown>
                    }
                </li>
                {ele.role == "user" && <img className='h-[40px] mr-8 mb-0 rounded-full self-end -mt-16' src={session?.user.image}></img>}
            </>
        })
    )
}

export default ResponseElement
