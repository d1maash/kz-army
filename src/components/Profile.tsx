"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";

interface UserData {
    full_name: string;
    // другие поля...
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/auth/admin-login");
            return;
        }

        const fetchUserData = async () => {
            try {
                const profile = await api.getProfile();
                setUserData(profile);
                // console.log(profile)
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error);
                router.push("/admin/login");
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/auth/admin-login");
    };

    if (!userData) return null; // Чтобы не рендерить, пока данные не загружены

    return (
        <div className="absolute top-5 right-5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="flex flex-col">
                    <h3 className="font-bold">{userData?.full_name}</h3>
                    <p className="text-[#C8C8C8] text-end text-xs">Администратор</p>
                </div>
                <Image
                    src="/Ivan.png"
                    alt="ivan"
                    width={40}
                    height={40}
                />
                <Image
                    src="/icons/down-arrow.svg"
                    alt="down-arrow"
                    width={10}
                    height={10}
                    className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Выйти
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;