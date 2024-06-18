"use client"
import React from 'react';

interface ToDo {
    todo: {
        title: string;
        description: string;
        priority: string;
        isPublic: boolean;
    }
    setOpenCloseView: React.Dispatch<React.SetStateAction<boolean>>;
}

const priorityColors: { [key: string]: string } = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
};

export function TodoCloseView({ todo, setOpenCloseView }: ToDo) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-semibold">{todo.title}</h2>
                <div className={`rounded-full text-xs py-1 px-2 ${priorityColors[todo.priority]} text-white`}>
                    {todo.priority}
                </div>
            </div>

            <p className="text-gray-300 mb-4">
                {todo.description}
            </p>
            <div className="mb-6">
                {todo.isPublic ?
                    <p className="text-green-500 font-semibold">Public</p> :
                    <p className="text-red-500 font-semibold">Private</p>
                }
            </div>
            <button
                onClick={() => setOpenCloseView(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
            >
                Close
            </button>
        </div>
    )
}
