"use client"

// import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ isHome }: { isHome?: boolean }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-5 lg:px-20 xl:px-28 z-10">
            {/* Logo */}
            <Link href="/" className={`font-bold text-lg ${isHome ? 'text-white' : 'text-black'}`}>ARMY.KZ</Link>
            
            {/* Desktop Links */}
            <div className={`hidden md:flex gap-6 font-semibold ${isHome ? 'text-custom-yellow' : 'text-[#7D7D7D]'}`}>
                <Link href="/">О программе</Link>
                <Link href="/application">Подача заявки</Link>
                <Link href="/article">Статьи</Link>
                <Link href="/faq">FAQ</Link>
            </div>
            <div className="hidden md:flex gap-3">
                <Link href="/auth/login" className="bg-custom-yellow text-black px-4 py-1 rounded-md">Войти</Link>
                <Link href="/auth/register" className={`border border-custom-yellow px-4 py-1 rounded-md ${isHome ? 'text-custom-yellow' : 'text-black'}`}>Регистрация</Link>
            </div>

            {/* Mobile Toggle Button */}
            <button className="md:hidden text-custom-yellow" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div
                className={`fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out z-1 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Close Navbar Button */}
                <div className="absolute top-0 right-0 mr-5 mt-5 text-white">
                    <Link href="#" onClick={toggleMenu}>
                        <X size={24} />
                    </Link>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col items-center justify-center h-full gap-8 text-custom-yellow font-semibold">
                    <Link href="/" onClick={toggleMenu}>
                        О программе
                    </Link>
                    <Link href="/application" onClick={toggleMenu}>
                        Подача заявки
                    </Link>
                    <Link href="/article" onClick={toggleMenu}>
                        Статьи
                    </Link>
                    <Link href="/faq" onClick={toggleMenu}>
                        FAQ
                    </Link>
                    <div className="flex gap-3 mt-6">
                        <Link href="/auth/login" className="border border-custom-yellow text-custom-yellow px-4 py-1 rounded-md">
                            Войти
                        </Link>
                        <Link href="/auth/register" className="bg-custom-yellow text-black px-4 py-1 rounded-md">
                            Регистрация
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar 
