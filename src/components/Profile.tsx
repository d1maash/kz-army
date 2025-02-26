"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";

const Profile = () => {
    const [userData, setUserData] = useState([]);
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
                console.log(profile)
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error);
                router.push("/admin/login");
            }
        };

        fetchUserData();
    }, [router]);

    if (!userData) return null; // Чтобы не рендерить, пока данные не загружены

    return (
        <div className="absolute top-5 right-5 flex items-center gap-3">
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
            />
        </div>
    );
};

export default Profile;