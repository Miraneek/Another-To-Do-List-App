"use client"
import React, {useState} from 'react';
import Link from "next/link";
import {useAuth} from "@/modules/auth/AuthContextProvider";

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        mainError: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {logIn} = useAuth();
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
        setErrors({...errors, [field]: error});
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({...errors, mainError: ''});
        setIsSubmitting(true);
        if (validateForm()) {
            try {
                await logIn(email, password);
            } catch (error: any) {
                setIsSubmitting(false)
                switch (error.code) {
                    case "auth/user-not-found":
                        setErrors({...errors, mainError: 'User not found'});
                        break;
                    case "auth/invalid-credential":
                        setErrors({...errors, mainError: 'Invalid credentials, please try again.'});
                        break;
                    case "auth/network-request-failed":
                        setErrors({...errors, mainError: 'Network request failed. Please try again.'});
                        break
                    case "auth/too-many-requests":
                        setErrors({...errors, mainError: 'Too many requests. Please try again after a bit.'});
                        break
                }
            }
        }
    };

    return (
        <div className={"m-auto"}>
            <form onSubmit={handleSubmit} className="lg:w-96 w-11/12 text-black">
                <h2 className={"text-white text-3xl mb-4 font-bold"}>Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white mb-2 text-xl font-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder={"Enter your email"}
                        className={`w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1 ml-1 font-semibold">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white mb-2 text-xl font-semibold">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        placeholder={"Enter your password"}
                        className={`w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1 ml-1 font-semibold">{errors.password}</p>}
                </div>
                <button type={"submit"}
                        className={"disabled:cursor-not-allowed w-full disabled:opacity-50 hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#e500a4] rounded-lg transition duration-300 ease-in-out"}
                        disabled={isSubmitting}>Login
                </button>
                {errors.mainError && <p className="text-red-500 text-sm mt-1 ml-1 font-semibold">{errors.mainError}</p>}
            </form>
            <div className={"mt-4 text-center text-white font-semibold flex flex-col items-center"}>
                <span>
                    Dont have an account?
                </span>
                <Link href={"/register"} className={"ml-2 text-blue-400 hover:text-blue-500 transition duration-300 ease-in-out text-semibold"}>Register</Link>
            </div>
        </div>
    );
}
