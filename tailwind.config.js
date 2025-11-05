/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Verdana", "Geneva", "Tahoma", "sans-serif"],
        jubilee: ["OT_Jubilee_Diamond", "serif"],
        prompt: ["Prompt", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        mitr: ["Mitr", "sans-serif"],
        ibmplex: ["IBM Plex Sans Thai", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        notosans: ["Noto Sans Thai", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
        rockwellCondensed: ['"Rockwell Condensed"', "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
