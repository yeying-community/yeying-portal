/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        puhuiBold: ['Puhui-Bold'],
        puhuiHeavy: ['Puhui-Heavy'],
        puhuiRegular: ['Puhui-Regular'],
        puhuiLight: ['Puhui-Light'],
        puhuiBlack: ['Puhui-Black'],
        puhuiMedium: ['Puhui-Medium'],
      },
    },
  },
  plugins: [],
}