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
        // console.log(profile)
        // is_staff нету в auth/me 
        if (profile.status === "unverified") throw new Error('Доступ запрещен');

        setIsAllowed(true); // Allow access if the user is an admin
      } catch (error) {
        console.error(error);
        router.push('/auth/admin-login'); // Redirect to login if there's an error
      } finally {
        setIsChecking(false); // Mark the check as complete
      }
    };

    checkAdmin();
  }, [router, pathname]);

  if (isChecking) {
    return <Loader />; 
  }

  if (!isAllowed) {
    console.log("IDI")
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