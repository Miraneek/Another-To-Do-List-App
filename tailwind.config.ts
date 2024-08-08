import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'lg': '0 0 8px 2px rgb(0 0 0 / 0.1), 0 0 4px 0px rgb(0 0 0 / 0.1)',
                'md': '0 0 6px 0px rgb(0 0 0 / 0.1), 0 0 4px 0px rgb(0 0 0 / 0.1)',
                'sm': '0 0 2px 0px rgb(0 0 0 / 0.1), 0 0 2px 0px rgb(0 0 0 / 0.1)',
            }
        },
    },
    plugins: [],
};
export default config;
