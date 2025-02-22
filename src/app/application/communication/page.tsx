import Navbar from "@/components/Navbar"
import { ChevronLeft } from 'lucide-react';
import Link from "next/link";

const Communication = () => {
  return (
    <>
        <Navbar />
        <div className="container mx-auto px-5 mt-20 md:mt-28">
            <div className="w-full border p-10 md:w-1/2 mx-auto flex flex-col items-center text-center">
                <div className="w-full flex justify-between items-center">
                    <Link href="/application"><ChevronLeft /></Link>
                    <h3 className="text-2xl font-bold">Форма для &quot;Связиста&quot;</h3>
                    <div className=""></div>
                </div>
                <p className="text-[#7D7D7D] mt-2">Заполните данные</p>
                <form action="#" className="w-full">
                    <div className="w-full">
                        <input 
                            type="text" 
                            placeholder="ФИО"
                            style={{
                                backgroundImage: "url('/icons/user.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "10px center", 
                                backgroundSize: "20px 20px", 
                            }}
                            className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10 "
                        />
                        {/* SElECT */}
                        <input 
                            type="text" 
                            
                        />
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Communication