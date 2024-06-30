import React from 'react'
import "@styles/globals.css"

const Loader = () => {
  console.log
  return (
    <div className='relative h-full overflow-hidden w-full z-[1000] px-10 animate-pulse'>
      <div className='absolute h-96 w-96 max-sm:w-20 max-sm:h-20 z-[1002] left-[34%] top-[20%] rounded-full overflow-hidden'>
        <img src='images/logo1.webp' className='h-full w-full'></img>
      </div>
      <dotlottie-player id="lottie-animation" src="animations/gemini_nerves.json" speed="1" style={{ height: "100%", width: "100%" }} loop autoplay></dotlottie-player>
    </div>
  )
}

export default Loader
