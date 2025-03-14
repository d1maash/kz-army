"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
    first_name: string;
    last_name: string;
}

const Profile = ({ isLeft, onLogout }: {isLeft?: boolean; onLogout: () => void}) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    
    // Check is admin
    const isAdmin = localStorage.getItem('is_admin')
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const profile = await api.getProfile();
                setUserData(profile);
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error);
                // onLogout()
            }
        };

        fetchUserData();
    }, [router, onLogout]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("is_admin");
        onLogout()
        router.push("/");
    };

    if (!userData) return null; // Чтобы не рендерить, пока данные не загружены

    return (
        <div className={`absolute top-5 ${isLeft ? "left-5" : "right-5"}`}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="flex flex-col">
                    <h3 className="font-bold">{userData?.first_name + " " + userData?.last_name || "Пользователь"}</h3>
                    <p className="text-[#C8C8C8] text-end text-xs">{isAdmin && "Администратор"}</p>
                </div>
                <Image
                    src="/icons/anon-profile.svg"
                    alt="User"
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
                    <Link 
                        href={`/profile`}
                        className="w-full block text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Личный Кабинет
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Выйти
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;