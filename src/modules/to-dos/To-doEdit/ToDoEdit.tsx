import React, { useState } from 'react';
import {editToDo} from "@/utils/to-do's/to-doFunctions";
import {Loading} from "@/modules/utils/Loading/Loading";
import {useAuth} from "@/modules/auth/AuthContextProvider";

interface ToDoData {
    title: string;
    description: string;
    priority: string;
    isPublic: boolean;
    deadline?: Date;
}

interface ToDoEditProps {
    data: ToDoData;
    id: string;
    setOpen: (open: boolean) => void;
}

export function ToDoEdit({ data, id, setOpen }: ToDoEditProps) {
    const [formData, setFormData] = useState<ToDoData>(data);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {user} = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
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
        editToDo({...formData, deadline: formData.deadline ? formData.deadline : undefined}, id).then(
            () => {
                setOpen(false)
                setIsSubmitting(false)
                window.location.reload();
            }
        )
    };

    return (
        <form onSubmit={handleSubmit}
              className="border border-white/10 p-6 backdrop-blur-2xl bg-black/60 rounded-xl focus:outline-none">
            <h2 className="text-white text-xl mb-4">Edit Task</h2>

            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="title">Title</label>
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
                <label className="block text-white mb-2" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-white/20 bg-black appearance-none placeholder-gray-400 rounded-lg text-white"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="mb-4 flex items-center">
                <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label className="text-white" htmlFor="isPublic">Public</label>
            </div>

            <button type="submit" disabled={isSubmitting || user.email === 'showcase@showcase.cz'}
                    className="bg-[#e500a4] disabled:bg-gray-400 disabled:cursor-not-allowed hover:border-white border-transparent border-2 text-white py-2 px-4 rounded-md">
                {isSubmitting ? <Loading/> : 'Save'}
            </button>
        </form>
    );
}
