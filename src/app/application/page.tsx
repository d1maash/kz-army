"use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/Footer"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const Application = () => {
    // Check if user is authenticated
    const hasShownToast = useRef(false)
    const router = useRouter()

    // Check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token && !hasShownToast.current) {
            hasShownToast.current = true
            toast.error("Требуется авторизация", {
                position: "top-center",
                duration: 4000,
            })
            router.push("/auth/login")
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 mt-20 md:mt-28 flex flex-col min-h-[50vh]">
                <div className="w-full p-10 md:w-1/2 lg:w-2/5 mx-auto flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold">Подача заявки на службу</h3>
                    <p className="text-[#7D7D7D] mt-2">Выберите один из вариантов.</p>

                    <div className="grid xl:grid-cols-2 gap-3 w-full mt-12">
                        <div className="w-full bg-[#F7F7F7] hover:bg-custom-yellow transition text-start rounded-xl p-4 group">
                            <h3 className="text-2xl font-medium">Связист</h3>
                            <p className="text-sm">Срок службы: От 3 лет (контрактная основа)</p>
                            <Image
                                src="/communication-bg.png"
                                alt="communication"
                                width={200}
                                height={200}
                                className="mx-auto bg-cover"
                            />
                            <Link href="/application/communication" className="block text-center mt-2 w-full border-2 transition border-custom-yellow group-hover:border-black hover:text-white hover:bg-black rounded-lg py-2">Подать заявку</Link>
                        </div>

                        <div className="w-full bg-[#F7F7F7] hover:bg-custom-yellow transition text-start rounded-xl p-4 group">
                            <h3 className="md:text-lg font-medium">Срочная Служба</h3>
                            <p className="text-sm">Срок службы: 12 месяцев</p>
                            <Image
                                src="/conscription-bg.png"
                                alt="conscription"
                                width={200}
                                height={200}
                                className="mx-auto customlg:mt-6 bg-cover"
                            />
                            <Link href="/application/conscription" className="block text-center mt-2 w-full border-2 transition border-custom-yellow group-hover:border-black hover:text-white hover:bg-black rounded-lg py-2">Подать заявку</Link>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Application