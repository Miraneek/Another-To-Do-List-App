"use client"
import React, {useState} from 'react';
import {registerUserAction} from "@/actions/auth/authActions";
import {useAction} from "next-safe-action/hooks";
import Link from "next/link";
import {useAuth} from "@/modules/auth/AuthContextProvider";

export function RegisterFrom() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        mainError: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {logIn} = useAuth();

    const {execute} = useAction(registerUserAction, {
        onSuccess: async (data) => {
            if (data.failure) {
                setIsSubmitting(false)
                setErrors({...errors, mainError: data.failure});
            } else if (data.success) {
                try {
                    await logIn(data.success.email, data.success.password)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        onError: (error) => {
            setIsSubmitting(false);
            console.log(error)
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
            case 'username':
                if (username.length < 3) error = 'Username must be at least 3 characters long';
                break;
            case 'password':
                if (!validatePassword(password)) error = 'Password must be at least 8 characters long';
                break;
            case 'confirmPassword':
                if (confirmPassword !== password) error = 'Passwords do not match';
                break;
            default:
                break;
        }
        setErrors({...errors, [field]: error});
    };

    const validateForm = () => {
        const emailError = validateEmail(email) ? '' : 'Invalid email address';
        const usernameError = username.length >= 3 ? '' : 'Username must be at least 3 characters long';
        const passwordError = validatePassword(password) ? '' : 'Password must be at least 8 characters long';
        const confirmPasswordError = confirmPassword === password ? '' : 'Passwords do not match';

        setErrors({
            ...errors,
            email: emailError,
            username: usernameError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });

        return !emailError && !usernameError && !passwordError && !confirmPasswordError;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({...errors, mainError: ''});
        setIsSubmitting(true);
        if (validateForm()) {
            execute({username, password, email});
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 text-black">
                <h2 className="text-2xl mb-4 text-center">Register</h2>
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
                    <label htmlFor="username" className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => handleBlur('username')}
                        className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                <button type={"submit"}
                        className={"disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        disabled={isSubmitting}>Register
                </button>
                {errors.mainError && <p className="text-red-500 text-lg">{errors.mainError}</p>}
            </form>
            <div className={"mt-4 text-center text-white font-semibold"}>
                <span>
                Already have an account?
                </span>
                <Link href={"/login"} className={"ml-2 text-blue-500"}>Login</Link>
            </div>
        </div>
    );
}
