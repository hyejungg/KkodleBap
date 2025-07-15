import tailwindcss from "@tailwindcss/vite";

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        SUIT: ['SUIT'],
      },
    },
  },
  plugins: [
    tailwindcss()
  ],
}
