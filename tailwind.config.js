/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        "popins":"Poppins"
      },
      colors: {
        "HeavyDark_green":"#4A628A",
        "light_violet": "#7E60BF",
        "Dark-violet": "#433878",
        "light-pink": "#E4B1F0",
        "water-pink": "#FFE1FF",
        "light_green":"#B9E5E8"
      },
    },
  },
  plugins: [],
};
