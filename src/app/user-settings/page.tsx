"use client"
import React, { useState } from 'react';
import { useAuth } from "@/modules/auth/AuthContextProvider";
import { editDisplayName, editPhotoUrl, resetPassword } from "@/utils/profile/editProfileFunctions";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { motion } from "framer-motion";

interface ProfileData {
    username: string;
    profilePictureUrl: string;
}

export default function UserSettings() {
    const { user, deleteAccount } = useAuth();
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
        resetPassword(user.email).then(() => {
            setIsResettingPassword(true);
        });
    };

    const handleUsernameChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingUsername(true);
        editDisplayName(formData.username).then(() => {
            setIsSubmittingUsername(false);
            setFormData({ username: '', profilePictureUrl: '' });
        });
    };

    const handleProfilePictureChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingProfilePicture(true);
        editPhotoUrl(formData.profilePictureUrl).then(() => {
            setIsSubmittingProfilePicture(false);
            setFormData({ username: '', profilePictureUrl: '' });
        });
    };

    return (
        <div className={"min-h-full h-[90vh] flex items-center justify-center flex-col"}>
            <div className={"w-full p-6 rounded-lg lg:max-w-xl flex flex-col items-start"}>
                <h2 className={"text-white text-3xl mb-4"}>✏️Edit Profile</h2>

                <form onSubmit={handleUsernameChange} className={"mb-4 flex items-start flex-col w-full"}>
                    <label className={"block text-white mb-2 text-xl"}>Username</label>
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
                    <label className={"block text-white mb-2 text-xl"}>Profile Picture Url</label>
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
                    <div className={"flex gap-4"}>
                        <button
                            type={"button"}
                            onClick={handleResetPassword}
                            className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#e500a4] rounded-lg transition duration-300 ease-in-out"}
                        >
                            Reset Password
                        </button>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger
                                className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#d90816] rounded-lg transition duration-300 ease-in-out"}
                            >
                                Delete Account
                            </AlertDialog.Trigger>
                            <AlertDialog.Portal>
                                <AlertDialog.Overlay className={"bg-black/40 fixed inset-0 z-40"} />
                                <AlertDialog.Content
                                    className={"fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className={"border border-white/10 p-6 backdrop-blur-xl bg-black/0 lg:w-auto lg:min-w-[400px] rounded-xl focus:outline-none"}
                                    >
                                        <AlertDialog.Title className={"text-white text-2xl font-semibold"}>
                                            ❌Delete Account❌
                                        </AlertDialog.Title>
                                        <AlertDialog.Description
                                            className={"text-white/70 mt-2 text-lg mb-4 font-semibold"}>
                                            Are you sure you want to delete your account? This action cannot be
                                            undone.
                                        </AlertDialog.Description>
                                        <div className={"flex gap-4"}>
                                            <AlertDialog.Cancel
                                                className={"hover:border-white/60 border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-white/10 rounded-lg transition duration-300 ease-in-out"}
                                            >
                                                Cancel
                                            </AlertDialog.Cancel>
                                            <AlertDialog.Action
                                                onClick={deleteAccount}
                                                className={"hover:border-white border-transparent border-2 text-white disabled:bg-gray-400 py-2 px-3 bg-[#d90816] rounded-lg transition duration-300 ease-in-out"}
                                            >
                                                Delete Account
                                            </AlertDialog.Action>
                                        </div>
                                    </motion.div>
                                </AlertDialog.Content>
                            </AlertDialog.Portal>
                        </AlertDialog.Root>
                    </div>
                    {isResettingPassword && <p className={"text-white mt-2"}>Password reset email sent!</p>}
                </div>
            </div>
        </div>
    );
}
