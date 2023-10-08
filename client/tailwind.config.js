/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        green:'rgb(14, 170, 14)'
      },
      boxShadow:{
        xl:'11px 12px 13px 12px rgb(207, 207, 207);'
      }
    },
    borderRadius:{
      large:'30px',
      sm:'8px'
    }
  },
  plugins: [],
}

