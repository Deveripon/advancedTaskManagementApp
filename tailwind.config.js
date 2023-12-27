/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#EEEEEE",
                accent: "#00ADB5",
                dark: "#393E46",
                darker: "#222831",
                orange: "#EE7214",
                blue: {
                    light: "#E3FDFD",
                    hard: "#A6E3E9",
                    harder: "#71C9CE",
                },
                dim: "#F3EEEA",
                pink: "#FF2E63",
                pinkLight: "#F8DFD4",
                green: "#65B741",
            },
            fontFamily: {
                paragraph: ["Hind", "sans-serif"],
                heading: ["Ubuntu", "sans-serif"],
            },
            fontSize: {
                heading: "30px",
                paragraph: "19px",
                icon: "32px",
                buttonText: "18px",
            },
        },
    },
    plugins: [],
};
