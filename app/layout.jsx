import '@styles/globals.css'
import Providers from './components/Providers'
import { ThemeProvider } from 'next-themes'


export const metadata = {
  title: "Aunt AI",
  description: "( All Model at one playground ) UI Developed by Mohit Arora 9667067062"
}

const RootLayout = ({ children }) => {
    return (
    <html lang="en" className='bg-white h-full'>
      <head>
        <meta name='description' content='Developed By Mohit Arora 9667067062'></meta>
        <meta name='og:image' content='images/logo1.jpeg'></meta>
        <link rel="icon" href='images/logo3.jpeg'></link>
        <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
      </head>
      <body className='bg-no-repeat h-full bg-gradient-to-t from-[#f3e7e9] to-[#e3eeff]'>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
