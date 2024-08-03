import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'md': '0 0 6px 0px rgb(0 0 0 / 0.1), 0 0 4px 0px rgb(0 0 0 / 0.1)',
                'sm': '0 0 2px 0px rgb(0 0 0 / 0.1), 0 0 2px 0px rgb(0 0 0 / 0.1)',
            }
        },
    },
    plugins: [],
};
export default config;
