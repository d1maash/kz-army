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

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Требуется авторизация');

        const profile = await api.getProfile();
        const is_admin = localStorage.getItem('is_admin');
        // console.log(profile)
        // is_staff нету в auth/me 
        if (!is_admin) throw new Error('Доступ запрещен') 
        if (profile.status === "unverified") throw new Error('Доступ запрещен');

        setIsAllowed(true);
      } catch (error) {
        console.error(error);
        router.push('/auth/admin-login');
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