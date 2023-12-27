/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html",
            "./src/**/*.{html,js,hbs}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}

