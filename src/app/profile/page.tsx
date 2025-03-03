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
import Loader from "@/components/Loader"

interface UserData {
    full_name?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    birth_date?: string,
    iin?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    status?: string;
}

const ProfilePage = () => {
    const router = useRouter()
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState<UserData>({} as UserData)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);

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
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [router])

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Удаляем все символы, кроме цифр и знака +
        const sanitizedValue = value.replace(/[^0-9+]/g, '');

        // Проверяем, начинается ли номер с +7 и не превышает ли 14 символов
        if (sanitizedValue.length <= 14) {
            if (sanitizedValue === '') {
                setEditedData({ ...editedData, phone: sanitizedValue });
            } else if (sanitizedValue.startsWith('+7') || sanitizedValue.startsWith('7')) {
                setEditedData({ ...editedData, phone: sanitizedValue });
            } else if (sanitizedValue.startsWith('8')) {
                // Если номер начинается с 8, заменяем на +7
                setEditedData({ ...editedData, phone: '+7' + sanitizedValue.slice(1) });
            } else {
                // Если номер не начинается с +7, добавляем его
                setEditedData({ ...editedData, phone: '+7' + sanitizedValue });
            }
        }
    };

    const handleSave = async () => {
        setErrorMessage('')
        try {
            if (!editedData.first_name || !editedData.last_name || !editedData.iin || !editedData.middle_name || !editedData.birth_date || !editedData.phone || !editedData.address) {
                setShowPopup(true)
                setTimeout(() => setShowPopup(false), 3000)
                return;
            }

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
            const err = error as Error;
            setErrorMessage(err.message || 'Ошибка при сохранении изменений')
            console.error('Update error:', err)
        }
    }

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader /></div>;

    if (errorMessage) {
        return <div className="text-red-500 text-center">{errorMessage}</div>;
    }

    if (!userData) return <div>Загрузка...</div>

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                <h2 className="font-bold text-2xl text-center md:text-left">Мой профиль</h2>

                {showPopup && (
                    <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
                        Не все поля заполнены. Пожалуйста, заполните все поля.
                    </div>
                )}

                <div className="mt-3 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src={userData.avatar || "/Ivan.png"}
                            alt="Avatar"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <div className="flex items-center">
                            <h3 className="font-bold text-lg">
                                {userData.full_name || "Пользователь"}
                            </h3>
                            <p className={`text-sm ml-5 ${userData.status === 'verified' ? 'text-green-500 border-green-500 border-2 px-2 rounded-full' : 'text-red-500 border-red-500 border-2 px-2 rounded-full'}`}>
                                {userData.status === 'verified' ? 'Подтвержден' : 'Не подтвержден'}
                            </p>
                            {userData.status !== 'verified' && (
                                <span className="ml-2 cursor-pointer relative group">
                                    ❓
                                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-500 text-white text-xs rounded p-2 w-60">
                                        Чтобы подтвердить ваш профиль, заполните ваши данные.
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="flex items-center gap-3 p-2 px-4 font-medium bg-custom-yellow rounded-xl mt-3 md:mt-0"
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
                                                required
                                            />
                                            <input
                                                className="w-full p-1 border rounded"
                                                value={editedData.first_name || ''}
                                                onChange={(e) => setEditedData({ ...editedData, first_name: e.target.value })}
                                                placeholder="Имя"
                                                required
                                            />
                                            <input
                                                className="w-full p-1 border rounded"
                                                value={editedData.middle_name || ''}
                                                onChange={(e) => setEditedData({ ...editedData, middle_name: e.target.value })}
                                                placeholder="Отчество"
                                                required
                                            />
                                        </div>
                                    ) : (
                                        userData.full_name || "Пожалуйста, заполните ФИО"
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
                                        userData.birth_date ? new Date(userData.birth_date).toLocaleDateString() : "Пожалуйста, заполните дату рождения"
                                    )}
                                </TableCell>

                                <TableCell className="font-bold">
                                    {isEditing ? (
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={editedData.iin || ''}
                                            onChange={(e) => setEditedData({ ...editedData, iin: e.target.value })}
                                            maxLength={12}
                                            placeholder="ИИН"
                                        />
                                    ) : (
                                        userData.iin || "Пожалуйста, заполните ИИН"
                                    )}
                                </TableCell>

                                <TableCell className="font-bold">
                                    {isEditing ? (
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={editedData.phone || ''}
                                            onChange={handlePhoneChange}
                                            maxLength={16}
                                            placeholder="Телефон (начинается с +7)"
                                        />
                                    ) : (
                                        userData.phone || "Пожалуйста, заполните телефон"
                                    )}
                                </TableCell>

                                <TableCell className="font-bold">
                                    {isEditing ? (
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={editedData.address || ''}
                                            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                                            placeholder="Адрес"
                                        />
                                    ) : (
                                        userData.address || "Пожалуйста, заполните адрес"
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                {/* Button to submit application */}
                <div className="flex justify-start mt-4">
                    <button
                        onClick={() => router.push('/application')}
                        className="font-medium w-full max-w-[200px] rounded-xl bg-custom-yellow py-3"
                    >
                        Подать заявку
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfilePage