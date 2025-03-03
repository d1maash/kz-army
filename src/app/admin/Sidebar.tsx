"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";


const Sidebar = () => {
  const pathname = usePathname()
  return (
    <aside className="min-w-20 md:max-w-64 md:w-full bg-white shadow-lg text-black p-4">
        {/* <h1 className="mt-20 text-2xl font-bold">Admin Panel</h1> */}
        <nav className="mt-20 font-semibold">
            <ul>

                <li 
                    className={`mb-2 rounded-xl p-2 px-3 md:px-5 ${
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
                        <p className="hidden md:block">Главная</p>
                    </a>
                </li>
                <li 
                    className={`mb-2 rounded-xl p-2 px-3 md:px-5 ${
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
                        <p className="hidden md:block">Заявки</p>
                    </a>
                </li> 
                <li 
                    className={`mb-2 rounded-xl p-2 px-3 md:px-5 ${
                        pathname === "/admin/question" ? "bg-custom-yellow" : ""
                    }`}
                >
                    <a href="/admin/question" className="hover:text-gray-400 flex items-center gap-3">
                        <Image 
                            src="/icons/question.svg"
                            alt="dashboard"
                            width={20}
                            height={20}
                        /> 
                        <p className="hidden md:block">Вопросы</p>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
  )
}

export default Sidebar