'use client'
import React, { useEffect, useRef, useState } from 'react'
import RequestButton from './components/RequestButton'
import ResponseElement from './components/ResponseElement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidePanel from './components/SidePanel';

import Loader from './components/Loader';

import { useSession } from 'next-auth/react';

const page = () => {
  const [prompt, setPrompt] = useState("");
  const [list, setList] = useState([]);
  const [seedValue, setSeedValue] = useState(1234);
  const [loading, setLoading] = useState(false);
  const [developerOptions, setDeveloperOptions] = useState()

  const [openAnimation , setOpenAnimation] = useState(true);

  const containerRef = useRef();

  const { data: session } = useSession();

  useEffect(() => {
    containerRef.current?.lastElementChild?.scrollIntoView()
  }, [list])

  useEffect(() => {
    setSeedValue(parseInt(Math.random() * 1000));
  }, [])

  return (<div className='w-full h-full flex'>
    {openAnimation && <Loader/>}
    <SidePanel session={session} setDeveloperOptions={setDeveloperOptions} />
    <div className='h-full w-[78%] flex flex-col justify-end'>
      <div className={`w-full mt-5 overflow-y-scroll scrollbar-thin mb-24`}>
        <ul className="scroll-smooth flex flex-col" ref={containerRef}>
          <ResponseElement list={list} session={session} />
          {loading && <li className={`w-auto max-w-[60%] max-h-32 mx-[5rem] my-3 self-start bg-[#dee0e2] rounded-xl animate-pulse overflow-hidden`}
            key={"Loader"}>
            <dotlottie-player src="animations/response_loader.json" background="transparent" speed="1" style={{ height: "300px", width: "300px", marginTop: "-70px" }} loop autoplay></dotlottie-player>
          </li>}
          <ToastContainer autoClose={1000} hideProgressBar={true} pauseOnHover={false} />
        </ul>
      </div>
      <RequestButton prompt={prompt} setPrompt={setPrompt} setList={setList} seedValue={seedValue} setLoading={setLoading} loading={loading} developerOptions={developerOptions} setOpenAnimation={setOpenAnimation}/>
    </div>
  </div>
  )
}

export default page
