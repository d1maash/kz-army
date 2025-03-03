"use client"

import React, { useEffect, useState } from "react";
import "./admin.css"
import Profile from "@/components/Profile";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/utils/api";
import Loader from "@/components/Loader";
// import Image from "next/image";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAllowed, setIsAllowed] = useState(false)
    const [isChecking, setIsChecking] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Требуется авторизация');

                const profile = await api.getProfile();
                const is_admin = localStorage.getItem('is_admin');
                // console.log(profile)
                // is_staff нету в auth/me 
                if (!is_admin) {
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        router.push('/profile');
                    }, 3000);
                    throw new Error('Доступ запрещен');
                }
                if (profile.status === "unverified") throw new Error('Доступ запрещен');


                setIsAllowed(true);
            } catch (error) {
                console.error(error);
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    router.push('/profile');
                }, 3000);
            } finally {
                setIsChecking(false);
            }
        };

        checkAdmin();
    }, [router, pathname]);

    if (isChecking) {
        return <Loader />;
    }

    if (!isAllowed) {
        console.log("IDI lil bro")
    }




    return (
        <div className="flex min-h-screen">
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-red-500 text-white p-4 rounded">
                        У вас недостаточно прав для доступа к этой странице.
                    </div>
                </div>
            )}

            {/* Profile */}
            <Profile />


            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 mt-16 p-4">
                {children}
            </main>
        </div>
    );
}