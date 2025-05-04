"use client"

import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center px-4 md:px-8">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-custom-yellow">404</h1>
                    <Image
                        src="/icons/404.svg"
                        alt="404 Иллюстрация"
                        width={300}
                        height={300}
                        className="mx-auto my-8"
                    />
                    <h2 className="text-2xl font-bold mb-4">Страница не найдена</h2>
                    <p className="text-[#7D7D7D] mb-8 max-w-md mx-auto">
                        Извините, страница, которую вы ищете, не существует или была перемещена
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 font-medium bg-custom-yellow text-black rounded-xl hover:bg-opacity-90 transition-all duration-200"
                    >
                        Вернуться на главную
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
} 