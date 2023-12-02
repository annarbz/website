/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/layout/**/*.{js,ts,jsx,tsx}",
        "!./node_modules",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', " sans-serif"]
            },
            colors: {
                "dark-teal": "#00acc1",
                "light-gray": "#bbbbbb",
                "black-2": '#111',
                "blue-gray": "#212529",
                "blue-gray-2": "#2c3237"
            },
            screens: {
                "xs": "460px"
            },
            aspectRatio: {
                "2/3": "2/3"
            }
        },
    },
    plugins: [],
}