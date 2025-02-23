"use client"

import React from "react";
import "./admin.css"
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="md:max-w-64 md:w-full bg-white shadow-lg text-black p-4">
                {/* <h1 className="mt-20 text-2xl font-bold">Admin Panel</h1> */}
                <nav className="mt-20 font-semibold">
                    <ul>

                        <li 
                            className={`mb-2 rounded-xl p-2 px-5 ${
                                pathname === "/admin" ? "bg-custom-yellow" : ""
                            }`}
                        >
                            <a href="/admin" className="hover:text-gray-400 flex items-center gap-3">
                                <Image 
                                    src="/icons/dashboard.svg"
                                    alt="dashboard"
                                    width={20}
                                    height={20}
                                /> 
                                <p className="hidden sm:block">Главная</p>
                            </a>
                        </li>
                        <li 
                            className={`mb-2 rounded-xl p-2 px-5 ${
                                pathname === "/admin/application" ? "bg-custom-yellow" : ""
                            }`}
                        >
                            <a href="/admin/application" className="hover:text-gray-400 flex items-center gap-3">
                                <Image 
                                    src="/icons/application.svg"
                                    alt="dashboard"
                                    width={20}
                                    height={20}
                                /> 
                                <p className="hidden sm:block">Заявки</p>
                            </a>
                        </li> 
                        <li className="mb-2 rounded-xl p-2 px-5">
                            <a href="/admin" className="hover:text-gray-400 flex items-center gap-3">
                                <Image 
                                    src="/icons/question.svg"
                                    alt="dashboard"
                                    width={20}
                                    height={20}
                                /> 
                                <p className="hidden sm:block">Вопросы</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
}