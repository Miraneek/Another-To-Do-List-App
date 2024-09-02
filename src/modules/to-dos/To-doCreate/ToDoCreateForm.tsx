import React, {useState} from 'react';
import {createToDo} from "@/utils/to-do's/to-doFunctions";
import {Loading} from "@/modules/utils/Loading/Loading";
import {useAuth} from "@/modules/auth/AuthContextProvider";
import {useTranslations} from "use-intl";

interface ToDoData {
    title: string;
    description: string;
    priority: string;
    isPublic: boolean;
    deadline?: Date;
}

interface ToDoCreateProps {
    setOpen: (open: boolean) => void;
}

export function ToDoCreateForm({setOpen}: ToDoCreateProps) {
    const [formData, setFormData] = useState<ToDoData>({
        title: '',
        description: '',
        priority: 'low',
        isPublic: false,
        deadline: undefined,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {user} = useAuth();

    const t = useTranslations("home.todos.card");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        if (type === 'checkbox') {
            const {checked} = e.target as HTMLInputElement;
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: checked
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        createToDo({...formData, deadline: formData.deadline ? formData.deadline : undefined}).then(
            () => {
                setOpen(false);
                setIsSubmitting(false);
                window.location.reload();
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-white text-xl mb-4">{t("create_todo")}</h2>

            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="title">{t("title")}</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="description">{t("description")}</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border-2 overflow-auto border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="priority">{t("priority.label")}</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-white/20 bg-black appearance-none placeholder-gray-400 rounded-lg text-white"
                >
                    <option value={"low"}>{t("priority.low")}</option>
                    <option value={"medium"}>{t("priority.medium")}</option>
                    <option value={"high"}>{t("priority.high")}</option>
                </select>
            </div>

            <div className="mb-4 flex items-center">
                <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="block w-4 aspect-square mr-2 hover:border-white border-transparent bg-black/20 border-2 re rounded-lg transition duration-300 ease-in-out"
                />
                <label className="text-white" htmlFor="isPublic">{t("is_public")}</label>
            </div>

            <button type="submit" disabled={isSubmitting || user.email === 'showcase@showcase.cz'} className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#e500a4] hover:border-white border-transparent border-2 text-white py-2 px-4 rounded-md">
                {isSubmitting ? <Loading/> : t("create")}
            </button>
        </form>
    );
}
