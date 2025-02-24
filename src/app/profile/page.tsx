"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const ProfilePage = () => {
    const [user, setUser] = useState<{
        name: string;
        role: string
    } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const profileData = await api.getProfile();
                setUser(profileData);
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error);
                localStorage.removeItem("token");
                router.push("/auth/login");
            }
        };

        fetchUser();
    }, [router]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                <h2 className="font-bold text-2xl">Мой профиль</h2>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/Ivan.png"
                            alt="Avatar"
                            width={50}
                            height={50}
                        />
                        <div className="flex flex-col">
                            <h3 className="font-bold text-lg">
                                {user?.name || "Загрузка..."}
                            </h3>
                            <p className="text-sm">{user?.role}</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-3 p-2 px-4 font-medium bg-custom-yellow rounded-xl">
                        Редактировать
                        <Image
                            src="/icons/pen.svg"
                            alt="Edit"
                            width={16}
                            height={16}
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;