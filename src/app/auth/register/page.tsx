"use client"

import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { api } from "@/utils/api"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import "../auth.css"
import toast from "react-hot-toast"

const Register = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const response = await api.register(
                email,
                password,
                username
            )

            console.log("Response from registration:", response);

            if (response.id) {
                console.log("Redirecting to profile...");
                toast.success('Регистрация прошла успешно!')
                setTimeout(() => {
                    router.push("/profile")
                }, 1000);
            } else {
                console.error("Registration failed, no ID returned.");
                setError("Ошибка регистрации, попробуйте еще раз.");
            }
        } catch (err: any) {
            let message = err.message;
            if (message.includes("Failed to fetch")) {
                message = "Проблемы с соединением";
            } else if (message.includes("Ошибка сервера")) {
                message = "Внутренняя ошибка сервера";
            }
            setError(message || "Ошибка регистрации")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Navbar />
            {isLoading ? (
                <div className="flex justify-center items-center bg-[#F4F4F4] w-full h-screen">
                    <div className="loader">Загрузка...</div>
                </div>
            ) : (
                <div className="flex justify-center items-center bg-[#F4F4F4] w-full h-screen">
                    <div className="w-full mx-10 md:w-1/3 p-12 bg-white rounded-xl shadow-lg text-center">
                        <h3 className="font-bold text-xl">Регистрация</h3>
                        <p className="text-[#7D7D7D]">Напишите ваш логин, e-mail и пароль</p>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <form onSubmit={handleSubmit} className="mt-6">
                            <input
                                type="text"
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10 "
                                placeholder="Логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength={1}
                                maxLength={150}
                                style={{
                                    backgroundImage: "url('/icons/user.svg')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "10px center",
                                    backgroundSize: "20px 20px",
                                }}
                            />
                            <input
                                type="email"
                                className="w-full rounded-xl mt-3 bg-[#F7F7F7] text-[#858585] p-3 pl-10 "
                                placeholder="e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                minLength={1}
                                maxLength={254}
                                style={{
                                    backgroundImage: "url('/icons/mail-send.svg')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "10px center",
                                    backgroundSize: "20px 20px",
                                }}
                            />
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full rounded-xl mt-3 bg-[#F7F7F7] text-[#858585] p-3 pr-10"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={1}
                                />
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

                            <button
                                type="submit"
                                className="w-full rounded-xl mt-6 p-3 font-medium bg-custom-yellow text-black"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                            </button>
                        </form>
                        <p className="mt-3 text-sm font-normal">
                            Уже есть аккаунт?{' '}
                            <span className="text-[#0084FF]">
                                <Link href="/auth/login">Войти</Link>
                            </span>
                        </p>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default Register