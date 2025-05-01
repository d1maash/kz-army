"use client"

// import Image from "next/image";
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from 'next/navigation'
import Profile from "./Profile"


const Navbar = ({ isHome }: { isHome?: boolean }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [user, setUser] = useState<{ username: string } | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token')
            const storedUser = localStorage.getItem('user')
            setUser(token && storedUser ? JSON.parse(storedUser) : null)
        }

        checkAuth()
        window.addEventListener('storage', checkAuth)
        return () => window.removeEventListener('storage', checkAuth)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setIsMenuOpen(false)
        window.location.reload()
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)


    return (
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-5 lg:px-20 xl:px-28 z-10">
            <Link href="/" className={`font-bold text-lg ${isHome ? 'text-white' : 'text-black'}`}>MY ARMY.KZ</Link>

            {/* Desktop Links */}
            <div className={`hidden lg:flex gap-6 font-semibold ${isHome ? 'text-custom-yellow' : 'text-[#7D7D7D]'}`}>
                <Link 
                    href="/" 
                    className={`relative hover-link ${pathname === '/' ? 'border-b-2 border-custom-yellow font-bold' : ''}`}
                >
                    О программе
                </Link>
                <Link 
                    href="/application" 
                    className={`relative hover-link ${pathname === '/application' ? 'border-b-2 border-custom-yellow font-bold text-black' : ''}`}
                >
                    Подача заявки
                </Link>
                <Link 
                    href="/article" 
                    className={`relative hover-link ${pathname === '/article' ? 'border-b-2 border-custom-yellow font-bold text-black' : ''}`}
                >
                    Статьи
                </Link>
                <Link 
                    href="/faq" 
                    className={`relative hover-link ${pathname === '/faq' ? 'border-b-2 border-custom-yellow font-bold text-black' : ''}`}
                >
                    FAQ
                </Link>
                <Link 
                    href="/faq/profiles" 
                    className={`relative hover-link ${pathname === '/faq/profiles' ? 'border-b-2 border-custom-yellow font-bold text-black' : ''}`}
                >
                    Профили
                </Link>
            </div>

            {user ? (
                <div className="hidden lg:flex items-center gap-4">
                    <Profile onLogout={handleLogout} />
                </div>
            ) : (
                <div className="hidden lg:flex gap-3">
                    <Link href="/auth/login" className="bg-custom-yellow text-black px-4 py-1 rounded-md">Войти</Link>
                    <Link href="/auth/register" className={`border border-custom-yellow px-4 py-1 rounded-md ${isHome ? 'text-custom-yellow' : 'text-black'}`}>Регистрация</Link>
                </div>
            )}

            {/* Mobile Toggle Button */}
            <button className="lg:hidden text-custom-yellow" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div
                className={`fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out z-1 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
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
                    <Link href="/faq/profiles" onClick={toggleMenu}>
                        Профили
                    </Link>
                    <div className="flex gap-3 mt-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Profile isLeft={true} onLogout={handleLogout}/>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link href="/auth/login" className="bg-custom-yellow text-black px-4 py-1 rounded-md">Войти</Link>
                            <Link href="/auth/register" className={`border border-custom-yellow px-4 py-1 rounded-md text-custom-yellow`}>Регистрация</Link>
                        </div>
                    )}
                        {/* <Link href="/auth/login" className="border border-custom-yellow text-custom-yellow px-4 py-1 rounded-md">
                            Войти
                        </Link>
                        <Link href="/auth/register" className="bg-custom-yellow text-black px-4 py-1 rounded-md">
                            Регистрация
                        </Link> */}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hover-link {
                    position: relative;
                    overflow: hidden;
                }
                .hover-link::after {
                    content: '';
                    display: block;
                    width: 0;
                    height: 2px;
                    background: yellow; /* Цвет линии */
                    position: absolute;
                    bottom: -5px; /* Расстояние от текста до линии */
                    left: 0;
                    transition: width 0.3s ease; /* Анимация */
                }
                .hover-link:hover::after {
                    width: 100%; /* Линия растягивается при наведении */
                }
            `}</style>
        </nav>
    );
};

export default Navbar 
