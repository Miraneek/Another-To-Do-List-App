import React, { useState } from 'react';
import {editToDo} from "@/utils/to-do's/to-doFunctions";
import {Loading} from "@/modules/utils/Loading/Loading";

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
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-white text-xl mb-4">Edit Task</h2>

            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
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

            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                {isSubmitting ? <Loading/> : 'Save'}
            </button>
        </form>
    );
}
