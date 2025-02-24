"use client"

import React from "react";
import "./admin.css"
import Profile from "@/components/Profile";
import Sidebar from "./Sidebar";
// import Image from "next/image";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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