/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          
"primary": "#bc00ff",
          
"secondary": "#00cb00",
          
"accent": "#2180ff",
          
"neutral": "#010b0d",
          
"base-100": "#292f31",
          
"info": "#00cbff",
          
"success": "#71cb00",
          
"warning": "#a46d00",
          
"error": "#ff0244",
          },
        },
      ],
    },
  plugins: [require('daisyui')],
}