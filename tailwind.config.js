/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Playfair:['Playfair Display'],
        Roboto:['Roboto, sans-serif'],
        Josefin:['Josefin Sans, sans-serif']
      },
    screens:{
      vvsm:"250px",
      vsm:"360px",
      ssm:"400px",
      sm:"640px",
      md:"768px",
      lg:"1024px",
      xl:"1280px"
    },
  },
  },
  plugins: [],
}

