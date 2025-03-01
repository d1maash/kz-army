"use client"

import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { api } from "@/utils/api";
import Image from "next/image";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    // const pathname = usePathname(); // Remove this line if not used

    // Password toggle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Main function
    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // 1. Выполняем вход
            const loginResponse = await api.login(username, password);
            localStorage.setItem("token", loginResponse.access);
            console.log(loginResponse);
            if (loginResponse.is_admin) {
                // is_admin для будущего
                localStorage.setItem('is_admin', loginResponse.is_admin);
                localStorage.setItem('user', JSON.stringify({ username }));
                // Redirect to the admin dashboard regardless of current path
                router.push('/admin');
            } else {
                setError('You dont have enough permission for this');
                localStorage.removeItem("token");
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Произошла неизвестная ошибка');
            }
        }
    }, [username, password, router]);

    // function handleLogin() {
    //     alert('salam')
    // }

    useEffect(() => {
        // Your logic here
    }, [handleLogin]); // Add handleLogin if it's defined outside

    return (
        <>
            <div className="absolute left-0 top-0 z-10 flex justify-center items-center bg-[#F4F4F4] w-full h-screen">
                <div className="w-full mx-10 md:w-1/3 p-12 bg-white rounded-xl shadow-lg text-center">
                    <h3 className="font-bold text-xl">Войти как Администратор</h3>
                    <p className="text-[#7D7D7D]">Напишите ваш логин и пароль</p>
                    {error && <p style={{ color: "red" }}>{error}</p>}
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
                            Войти
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLogin