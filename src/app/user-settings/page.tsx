"use client"
import React, { useState } from 'react';
import {useAuth} from "@/modules/auth/AuthContextProvider";
import {editDisplayName, editPhotoUrl, resetPassword} from "@/utils/profile/editProfileFunctions";
import Link from "next/link";

interface ProfileData {
    username: string;
    profilePictureUrl: string;
}

export default function UserSettings() {
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
        <div className={"min-h-full flex items-center justify-center flex-col"}>
            <div className={"w-full p-6 rounded-lg lg:max-w-xl flex flex-col items-start"}>
                <h2 className={"text-white text-3xl mb-4"}>✏️Edit Profile</h2>

                <form onSubmit={handleUsernameChange} className={"mb-4 flex items-start flex-col w-full"}>
                    <label className={"block text-white mb-2 text-xl"} htmlFor={"username"}>Username</label>
                    <div className={"flex w-full"}>
                        <input
                            type={"text"}
                            id={"username"}
                            name={"username"}
                            value={formData.username}
                            onChange={handleChange}
                            className={"w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400"}
                            placeholder={"Enter your new username"}
                        />
                        <button
                            type={"submit"}
                            disabled={isSubmittingUsername}
                            className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#e500a4] rounded-lg ml-2 transition duration-300 ease-in-out"}
                        >
                            Change
                        </button>
                    </div>
                </form>

                <form onSubmit={handleProfilePictureChange} className={"mb-4 flex items-start flex-col w-full"}>
                    <label className={"block text-white mb-2 text-xl"} htmlFor={"profilePictureUrl"}>Profile Picture
                        Url</label>
                    <div className={"flex w-full"}>
                        <input
                            type={"text"}
                            name={"profilePictureUrl"}
                            value={formData.profilePictureUrl}
                            onChange={handleChange}
                            className={"w-full p-2 border-2 border-white/20 bg-black/20 rounded-lg text-white placeholder-gray-400"}
                            placeholder={"Enter your new profile picture URL"}
                        />
                        <button
                            type={"submit"}
                            disabled={isSubmittingProfilePicture}
                            className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#e500a4] rounded-lg ml-2 transition duration-300 ease-in-out"}
                        >
                            Save
                        </button>
                    </div>
                </form>

                <div className={"mb-4 flex flex-col items-start"}>
                    <button
                        type={"button"}
                        onClick={handleResetPassword}
                        className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#d90816] rounded-lg transition duration-300 ease-in-out"}
                    >
                        Reset Password
                    </button>
                    {isResettingPassword && <p className={"text-white mt-2"}>Password reset email sent!</p>}
                </div>
            </div>
        </div>

    );
}
