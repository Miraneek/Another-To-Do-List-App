"use client"
import React, {useEffect, useState} from 'react';
import { loginUserAction } from "@/actions/auth/loginAction";
import { useAction } from "next-safe-action/hooks";
import {auth} from "@/lib/firebase";

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        mainError: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {execute} = useAction(loginUserAction, {
        onSuccess: () => {
            setIsSubmitting(false)
            setErrors({ ...errors, mainError: ''});
        },
        onError: (error) => {
            console.log(error)
            setIsSubmitting(false)
        },
    });

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: string) => {
        const regex = /^.{8,}$/;
        return regex.test(password);
    };

    const handleBlur = (field: string) => {
        let error = '';
        switch (field) {
            case 'email':
                if (!validateEmail(email)) error = 'Invalid email address';
                break;
            case 'password':
                if (!validatePassword(password)) error = 'Password must be at least 8 characters long';
                break;
            default:
                break;
        }
        setErrors({ ...errors, [field]: error });
    };

    const validateForm = () => {
        const emailError = validateEmail(email) ? '' : 'Invalid email address';
        const passwordError = validatePassword(password) ? '' : 'Password must be at least 8 characters long';

        setErrors({
            ...errors,
            email: emailError,
            password: passwordError,
        });

        return !emailError && !passwordError;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({...errors, mainError: ''});
        setIsSubmitting(true);
        if (validateForm()) {
            execute({ email, password });
        } else {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4 text-center">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <button type={"submit"} className={"disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} disabled={isSubmitting}>Login</button>
                {errors.mainError && <p className="text-red-500 text-lg">{errors.mainError}</p>}
            </form>
        </div>
    );
}
