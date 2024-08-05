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
                }
            }
        },
        onError: (error) => {
            setIsSubmitting(false);
            setErrors({...errors, mainError: JSON.stringify(error)});
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
            <form onSubmit={handleSubmit} className="lg:w-96 text-black">
                <h2 className={"text-white text-3xl mb-4 font-bold mt-20"}>Register</h2>
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
                    <label htmlFor="username" className="block text-white mb-2 text-xl font-semibold">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => handleBlur('username')}
                        placeholder={"Enter your username"}
                        className={`w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.username &&
                        <p className="text-red-500 text-sm mt-1 ml-1 font-semibold">{errors.username}</p>}
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
                    {errors.password &&
                        <p className="text-red-500 text-sm mt-1 ml-1 font-semibold">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-white mb-2 text-xl font-semibold">Confirm
                        Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        placeholder={"Confirm your password"}
                        className={`w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                <button type={"submit"}
                        className={"disabled:cursor-not-allowed w-full disabled:opacity-50 hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#e500a4] rounded-lg transition duration-300 ease-in-out"}
                        disabled={isSubmitting}>
                        Register
                </button>
                {isSubmitting && <p className={"text-[#e500a4] text-sm mt-1 ml-1 font-semibold"}>Check your email for verification.</p>}
                {errors.mainError && <p className="text-red-500 text-sm mt-1 ml-1 font-semibold">{errors.mainError}</p>}
            </form>
            <div className={"mt-4 text-center text-white font-semibold flex flex-col items-center"}>
                <span>
                    Already have an account?
                </span>
                <Link href={"/login"}
                      className={"ml-2 text-blue-400 hover:text-blue-500 transition duration-300 ease-in-out text-semibold"}>Login</Link>
            </div>
        </div>

    );
}
