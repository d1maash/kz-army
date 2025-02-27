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

interface UserData {
    full_name?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    birth_date?: string;
    iin?: string;
    phone?: string;
    address?: string;
    avatar?: string;
}

const ProfilePage = () => {
    const router = useRouter()
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState<UserData>({} as UserData)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if (!token || !user) {
            router.push('/auth/login')
        } else {
            api.getProfile()
                .then(data => {
                    setUserData(data)
                    setEditedData(data)
                })
                .catch(error => {
                    console.error('Error fetching profile:', error)
                    if (error.message === 'Сессия истекла') {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        router.push('/auth/login')
                    }
                })
        }
    }, [router])

    const handleSave = async () => {
        setErrorMessage('')
        try {
            const dataToSend = {
                first_name: editedData.first_name,
                last_name: editedData.last_name,
                middle_name: editedData.middle_name,
                birth_date: editedData.birth_date,
                iin: editedData.iin,
                phone: editedData.phone,
                address: editedData.address,
            }

            const updatedData = await api.updateProfile(dataToSend)
            setUserData(updatedData)
            setIsEditing(false)
        } catch (error) {
            setErrorMessage(error.message || 'Ошибка при сохранении изменений')
            console.error('Update error:', error)
        }
    }

    if (!userData) return <div>Загрузка...</div>

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                <h2 className="font-bold text-2xl">Мой профиль</h2>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src={userData.avatar || "/Ivan.png"}
                            alt="Avatar"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <div className="flex flex-col">
                            <h3 className="font-bold text-lg">
                                {userData.full_name || "Пользователь"}
                            </h3>
                            <p className="text-sm">Связист</p>
                        </div>
                    </div>

                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="flex items-center gap-3 p-2 px-4 font-medium bg-custom-yellow rounded-xl"
                    >
                        {isEditing ? 'Сохранить' : 'Редактировать'}
                        <Image
                            src="/icons/pen.svg"
                            alt="pen"
                            width={16}
                            height={16}
                        />
                    </button>
                </div>

                {errorMessage && (
                    <div className="mt-4 text-red-500">{errorMessage}</div>
                )}

                {/* PROFILE INFORMATION */}
                <div className="w-full pb-2 mt-6 text-center bg-white rounded-xl border-2 border-[#C8C8C8] overflow-x-auto">
                    <Table className="min-w-[600px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] text-black text-center">ФИО</TableHead>
                                <TableHead className="text-black text-center">Дата рождения</TableHead>
                                <TableHead className="text-black text-center">ИИН</TableHead>
                                <TableHead className="text-black text-center">Контактные данные</TableHead>
                                <TableHead className="text-black text-center">Адрес проживания</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold">
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <input
                                                className="w-full p-1 border rounded"
                                                value={editedData.last_name || ''}
                                                onChange={(e) => setEditedData({ ...editedData, last_name: e.target.value })}
                                                placeholder="Фамилия"
                                            />
                                            <input
                                                className="w-full p-1 border rounded"
                                                value={editedData.first_name || ''}
                                                onChange={(e) => setEditedData({ ...editedData, first_name: e.target.value })}
                                                placeholder="Имя"
                                            />
                                            <input
                                                className="w-full p-1 border rounded"
                                                value={editedData.middle_name || ''}
                                                onChange={(e) => setEditedData({ ...editedData, middle_name: e.target.value })}
                                                placeholder="Отчество"
                                            />
                                        </div>
                                    ) : (
                                        userData.full_name
                                    )}
                                </TableCell>

                                <TableCell className="font-bold">
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            className="w-full p-1 border rounded"
                                            value={editedData.birth_date?.split('T')[0] || ''}
                                            onChange={(e) => setEditedData({ ...editedData, birth_date: e.target.value })}
                                        />
                                    ) : (
                                        new Date(userData.birth_date || '').toLocaleDateString()
                                    )}
                                </TableCell>

                                <TableCell className="font-bold">
                                    {isEditing ? (
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={editedData.iin || ''}
                                            onChange={(e) => setEditedData({ ...editedData, iin: e.target.value })}
                                            maxLength={12}
                                        />
                                    ) : (
                                        userData.iin
                                    )}
                                </TableCell>

                                <TableCell className="font-bold">
                                    {isEditing ? (
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={editedData.phone || ''}
                                            onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                                            maxLength={15}
                                        />
                                    ) : (
                                        userData.phone
                                    )}
                                </TableCell>

                                <TableCell className="font-bold">
                                    {isEditing ? (
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={editedData.address || ''}
                                            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                                        />
                                    ) : (
                                        userData.address
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                {/* Остальная часть компонента без изменений */}
            </div>
        </>
    )
}

export default ProfilePage