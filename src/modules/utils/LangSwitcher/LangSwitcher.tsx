"use client"

import {startTransition, useEffect, useState} from "react";
import {Locale} from "@/lib/next-intl/config";
import {getUserLocale, setUserLocale} from "@/lib/next-intl/locale";
import {changeLanguage} from "@/utils/profile/editProfileFunctions";

interface Props {
    setLocale?: Function
}

export default function LangSwitcher({setLocale}: Props) {

    const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value
        const locale = value as Locale;
        startTransition(async () => {
            await setUserLocale(locale).then(r => changeLanguage(locale));
            setLanguage(locale);
            if (setLocale) setLocale(locale);
        });
    }

    const [language, setLanguage] = useState("en")

    useEffect(() => {
        (async () => {
            const locale = await getUserLocale();
            setLanguage(locale);
        })();
    }, []);

    return <>
        <select
            value={language}
            onChange={handleLangChange}
            className={"block w-full mb-4 px-4 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-md shadow-sm"}
        >
            <option value={"en"}>
                English
            </option>
            <option value={"cz"}>
                Čeština
            </option>
        </select>
    </>
}