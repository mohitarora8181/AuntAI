/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes:{
        slideLeft:{
          "0%":{transform:"translateX(200%)"},
          "100%":{transform:"translateX(0%)"}
        },
        slideRight:{
          "0%":{transform:"translateX(-200%)"},
          "100%":{transform:"translateX(0%)"}
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0%)' },
          '99%': { transform: 'translateX(-200%)'},
          '100%':{display:"none"}
        }
      },
      animation:{
        slideIn:"slideLeft 0.2s ease-in-out",
        slideInRight:"slideRight 0.5s ease-in-out",
        slideOut: 'slideOutRight 0.3s ease-in-out',
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
