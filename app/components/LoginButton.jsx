'use client'
import {useSession , signIn} from "next-auth/react";
import React from 'react'

const LoginButton = () => {
  return (
    <div>
      <button onClick={()=>{signIn("google")}}>Login</button>
    </div>
  )
}

export default LoginButton
