/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        doctorPortalstheme: {
          primary: "#ff476b",
          secondary: "#19D3AE",
          accent: "#3A4256",
          neutral: "#AFB7CA",
         "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require('daisyui')],
}
