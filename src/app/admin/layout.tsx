"use client"

import React, { useEffect, useState } from "react";
import "./admin.css"
import Profile from "@/components/Profile";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/utils/api";
import Loader from "@/components/Loader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter()
    const pathname = usePathname()
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Требуется авторизация');

                const profile = await api.getProfile();
                const is_admin = localStorage.getItem('is_admin');
                if (!is_admin) {
                    router.push('/auth/admin-login')
                    throw new Error('Доступ запрещен');
                }
                if (profile.status === "unverified") throw new Error('Доступ запрещен');


            } catch (error) {
                console.error(error);
                router.push('/auth/admin-login')
            } finally {
                setIsChecking(false);
            }
        };

        checkAdmin();
    }, [router, pathname]);

    if (isChecking) {
        return <Loader />;
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload()
    }


    return (
        <div className="flex min-h-screen">

            {/* Profile */}
            <Profile onLogout={handleLogout} />


            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 mt-16 p-4">
                {children}
            </main>
        </div>
    );
}