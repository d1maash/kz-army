"use client"

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import Image from "next/image";
import Footer from "@/components/Footer";
import "../auth.css"
import toast from "react-hot-toast";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/profile"); // Redirect to profile if already logged in
        }
    }, [router]);

    // Password toggle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Main function
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await api.login(username, password)
            localStorage.setItem('token', response.access)
            localStorage.setItem('user', JSON.stringify({ username }))

            // Check if the user is an admin
            if (response.is_admin) {
                router.push('/admin'); 
            } else {
                // Redirect to the user's personal account page
                router.push('/profile'); // Change this to the correct user profile page if different
                toast.success('Авторизация прошла успешно')
            }
        } catch (err) {
            console.error(err)
            toast.error('Ошибка авторизации')
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center bg-[#F4F4F4] w-full h-screen">
                <div className="w-full mx-10 md:w-1/3 p-12 bg-white rounded-xl shadow-lg text-center">
                    <h3 className="font-bold text-xl">Войти</h3>
                    <p className="text-[#7D7D7D]">Напишите ваш логин и пароль</p>
                    <form onSubmit={handleLogin} className="mt-6">
                        <input
                            type="text"
                            className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10 "
                            placeholder="Логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                backgroundImage: "url('/icons/user.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "10px center",
                                backgroundSize: "20px 20px",
                            }}
                        />
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full rounded-xl mt-3 bg-[#F7F7F7] text-[#858585] p-3 pr-10" // Add padding for the icon
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* Toggle Button with Custom Icon */}
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-3"
                            >
                                {showPassword ? (
                                    <Image
                                        src="/icons/eye-invisible.svg"
                                        alt="Hide Password"
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <Image
                                        src="/icons/eye-visible.svg"
                                        alt="Show Password"
                                        width={20}
                                        height={20}
                                    />
                                )}
                            </button>
                        </div>

                        <button type="submit" className="w-full rounded-xl mt-6 p-3 font-medium bg-custom-yellow text-black">
                            Войти
                        </button>

                    </form>
                    <p className="mt-3 text-sm font-normal">У вас еще нет аккаунта? <span className="text-[#0084FF]"><Link href={`/auth/register`}>Зарегистрироваться</Link></span></p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
