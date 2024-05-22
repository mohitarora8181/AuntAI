import React from 'react'

const Loader = () => {
  console.log
  return (
    <div className='absolute h-full overflow-hidden w-full bg-[#f1f2f7] z-[1000] max-sm:hidden'>
      <div className='absolute h-96 w-96 z-[1002] left-[37.5%] top-[20%] rounded-full overflow-hidden'>
        <img src='images/logo1.jpeg' className='h-full w-full animate-pulse'></img>
      </div>
      <dotlottie-player src="animations/gemini_nerves.json" speed="1" style={{ height: "100%", width: "100%" }} loop autoplay></dotlottie-player>
      <div className='w-full flex justify-end h-[22%] max-sm:h-2/5 absolute z-[1001]  bg-[#f1f2f7] bottom-10'>
        <dotlottie-player src="animations/gemini_logo.json" speed="1" style={{width:"30%"}} loop autoplay></dotlottie-player>
      </div>
    </div>
  )
}

export default Loader
