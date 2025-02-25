"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import Navbar from "@/components/Navbar"
import Image from "next/image"
import { EllipsisVertical } from 'lucide-react';
import { testData } from "../admin/application/testData"


const ProfilePage = () => {
    const router = useRouter()
    const [userData, setUserData] = useState<{
        username: string
        birthDate?: string
        iin?: string
        phone?: string
        address?: string
    } | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if (!token || !user) {
            router.push('/auth/login')
        } else {
            setUserData(JSON.parse(user))
            // Здесь можно добавить запрос для получения полных данных пользователя
        }
    }, [router])

    if (!userData) return <div>Loading...</div>

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                <h2 className="font-bold text-2xl">Мой профиль</h2>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/Ivan.png"
                            alt="Ivan"
                            width={50}
                            height={50}
                        />
                        <div className="flex flex-col">
                            <h3 className="font-bold text-lg">{userData.username}</h3>
                            <p className="text-sm">Связист</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-3 p-2 px-4 font-medium bg-custom-yellow rounded-xl">
                        Редактировать
                        <Image
                            src="/icons/pen.svg"
                            alt="pen"
                            width={16}
                            height={16}
                        />
                    </button>
                </div>

                {/* PROFILE INFORMATION */}
                <div className="w-full pb-2 mt-6 text-center bg-white rounded-xl border-2 border-[#C8C8C8] overflow-x-auto">
                    <Table className="min-w-[600px]">
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow className="">
                                <TableHead className="w-[200px] text-black text-center">ФИО</TableHead>
                                <TableHead className="text-black text-center">Дата рождения</TableHead>
                                <TableHead className="text-black text-center">ИИН</TableHead>
                                <TableHead className="text-black text-center">Контактные данные</TableHead>
                                <TableHead className="text-black text-center">Адрес проживания</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold">{userData.username}</TableCell>
                                <TableCell className="font-bold">12.02.1997</TableCell>
                                <TableCell className="font-bold">010101010101</TableCell>
                                <TableCell className="font-bold">+7 (777) 777 77 77</TableCell>
                                <TableCell className="font-bold">Акмолинская область, г. Астана, Елорда 12</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                {/* APPLICATION STATUS */}
                <h3 className="mt-3 font-bold text-xl">Статус заявок</h3>
                <div className="w-full pb-2 mt-3 text-center bg-white rounded-xl border-2 border-[#C8C8C8] overflow-x-auto">
                    <Table className="min-w-[600px]">
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow className="bg-[#C8C8C8]/70 hover:bg-[#C8C8C8]">
                                <TableHead className="w-[200px] text-black text-center">Заявка</TableHead>
                                <TableHead className="text-black text-center">Дата подачи заявки</TableHead>
                                <TableHead className="text-black text-center"> Отслеживания этапов рассмотрения</TableHead>
                                <TableHead className="text-black text-center">Статус заявки</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className="font-bold">{row.type === "conscription" ? "Срочная служба" : "Связист"}</TableCell>
                                    <TableCell className="font-bold">{row.date}</TableCell>
                                    <TableCell className="font-bold">Проверка документов</TableCell>
                                    <TableCell className="font-bold">
                                        <button
                                            className={`rounded-xl font-semibold p-1 px-3 ${row.status === "Одобрена" ?
                                                "text-[#277C00] bg-[#E0FFD1]" :
                                                row.status === "В обработке" ?
                                                    "text-[#9F5000] bg-[#FFE7CE]" :
                                                    "text-[#9F0000] bg-[#FFDCDC]"
                                                }`}
                                        >
                                            {row.status}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* DOCUMENTS */}
                <h3 className="mt-3 font-bold text-xl">Документы</h3>
                <div className="flex items-center gap-2">
                    <div className="relative flex flex-col items-center justify-center gap-2 bg-white rounded-xl size-24 shadow-lg">
                        <EllipsisVertical className="size-5 absolute top-2 right-1" />
                        <Image
                            src="/icons/file-pdf.svg"
                            alt="pdf"
                            width={30}
                            height={30}
                        />
                        <p className="text-sm">Паспорт.pdf</p>
                    </div>
                    <div className="relative flex flex-col items-center justify-center gap-2 bg-white rounded-xl size-24 shadow-lg">
                        <EllipsisVertical className="size-5 absolute top-2 right-1" />
                        <Image
                            src="/icons/file-pdf.svg"
                            alt="pdf"
                            width={30}
                            height={30}
                        />
                        <p className="text-sm">Паспорт.pdf</p>
                    </div>
                </div>


            </div>
        </>
    )
}
export default ProfilePage