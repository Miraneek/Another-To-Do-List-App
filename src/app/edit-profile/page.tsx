"use client"
import React, { useState } from 'react';
import {useAuth} from "@/modules/auth/AuthContextProvider";
import {editDisplayName, editPhotoUrl, resetPassword} from "@/utils/profile/editProfileFunctions";
import Link from "next/link";

interface ProfileData {
    username: string;
    profilePictureUrl: string;
}

export default function ProfilePage() {
    const {user} = useAuth()
    const [formData, setFormData] = useState<ProfileData>({
        username: '',
        profilePictureUrl: '',
    });
    const [isSubmittingUsername, setIsSubmittingUsername] = useState(false);
    const [isSubmittingProfilePicture, setIsSubmittingProfilePicture] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleResetPassword = () => {
        resetPassword(user.email).then((res) => {
            setIsResettingPassword(true);
        })
    };

    const handleUsernameChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingUsername(true);
        editDisplayName(formData.username).then(() => {
            setIsSubmittingUsername(false);
            setFormData({username: '', profilePictureUrl: ''});
        })
    };

    const handleProfilePictureChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingProfilePicture(true);
        editPhotoUrl(formData.profilePictureUrl).then(() => {
            setIsSubmittingProfilePicture(false);
            setFormData({username: '', profilePictureUrl: ''});
        })
    };

    return (
            <div className="min-h-screen flex items-center justify-center flex-col">
                <div className="bg-gray-800 w-full p-6 rounded-lg lg:max-w-xl">
                    <h2 className="text-white text-xl mb-4">Edit Profile</h2>

                    <form onSubmit={handleUsernameChange} className="mb-4 flex items-center">
                        <label className="block text-white mr-4" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                        <button
                            type="submit"
                            disabled={isSubmittingUsername}
                            className="bg-blue-500 text-white disabled:bg-gray-400 py-2 px-4 rounded-md ml-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Change
                        </button>
                    </form>

                    <form onSubmit={handleProfilePictureChange} className="mb-4 flex items-center">
                        <label className="text-white w-fit">Profile Picture URL</label>
                        <input
                            type="text"
                            name="profilePictureUrl"
                            value={formData.profilePictureUrl}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                        <button
                            type="submit"
                            disabled={isSubmittingProfilePicture}
                            className="bg-blue-500 disabled:bg-gray-400 text-white py-2 px-4 rounded-md ml-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Save
                        </button>
                    </form>

                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                            Reset Password
                        </button>
                        {isResettingPassword && <p className="text-white">Password reset email sent!</p>}
                    </div>
                </div>
                <Link href={"/"} className={"text-blue-400"}>Go back</Link>
            </div>
    );
}
