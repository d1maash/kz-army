"use client"

import Navbar from "@/components/Navbar"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { api } from "@/utils/api"
import { useState, useEffect } from "react"

interface ProfileData {
    full_name: string
    birth_date: string
    email: string
    phone: string
    address: string
}

const Conscription = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        full_name: "",
        birth_date: "",
        email: "",
        phone: "",
        address: "",
        comment: "",
        has_postponement: false,
        files: [] as File[]
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profileData = await api.getProfile()
                setProfile(profileData)

                setFormData(prev => ({
                    ...prev,
                    full_name: profileData.full_name || "",
                    birth_date: profileData.birth_date?.split('T')[0] || "",
                    email: profileData.email || "",
                    phone: profileData.phone || "",
                    address: profileData.address || ""
                }))
            } catch (err) {
                console.error("Ошибка загрузки профиля:", err)
                setError("Необходимо авторизоваться")
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target

        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked,
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setFormData({
                ...formData,
                files: [...formData.files, ...files]
            })
        }
    }

    const removeFile = (index: number) => {
        const newFiles = [...formData.files]
        newFiles.splice(index, 1)
        setFormData({ ...formData, files: newFiles })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (formData.files.length === 0) {
            setError("Необходимо прикрепить хотя бы один файл")
            return
        }

        const form = new FormData()

        // Добавляем текстовые поля напрямую в FormData
        form.append("full_name", formData.full_name)
        form.append("birth_date", formData.birth_date)
        form.append("email", formData.email)
        form.append("phone", formData.phone)
        form.append("address", formData.address)
        form.append("comment", formData.comment)
        form.append("has_postponement", String(formData.has_postponement))

        // Добавляем файлы с правильным именем поля
        formData.files.forEach((file) => {
            form.append("files", file) // Множественное число - files!
        })

        try {
            const response = await api.postFormData(
                "/applications/applications/conscription/",
                form
            )

            console.log("Успешная отправка:", response)
            alert("Заявка успешно отправлена!")

        } catch (err: any) {
            console.error("Ошибка отправки:", err)

            if (err.message.includes("401")) {
                setError("Требуется авторизация")
            } else if (err.message.includes("403")) {
                setError("Пользователь не верифицирован")
            } else {
                setError(err.message || "Ошибка отправки заявки")
            }
        }
    }

    if (loading) return <div>Загрузка...</div>
    if (!profile) return <div>Необходимо авторизоваться</div>

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 mt-20 md:mt-28">
                <div className="w-full p-10 lg:w-1/2 mx-auto flex flex-col items-center text-center">
                    <div className="w-full flex justify-between items-center">
                        <Link href="/application"><ChevronLeft /></Link>
                        <h3 className="text-2xl font-bold">Форма для &quot;Срочной службы&quot;</h3>
                        <div className=""></div>
                    </div>
                    <p className="text-[#7D7D7D] mt-2">Заполните данные</p>

                    <form onSubmit={handleSubmit} className="w-full mt-6">
                        {error && <div className="text-red-500 mb-4">{error}</div>}

                        <div className="w-full grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="ФИО"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10"
                                required
                            />

                            <input
                                type="email"
                                placeholder="Электронная почта"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3"
                                required
                            />
                        </div>

                        <div className="w-full mt-3 grid md:grid-cols-2 gap-6">
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleInputChange}
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10"
                                required
                            />

                            <div className="flex flex-col text-start">
                                <p className="font-medium">Есть ли отсрочка?</p>
                                <input
                                    type="checkbox"
                                    id="toggle"
                                    className="sr-only peer"
                                    name="has_postponement"
                                    checked={formData.has_postponement}
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="toggle"
                                    className="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer peer-checked:bg-blue-500 transition-all duration-300 relative"
                                >
                                    <span className={`w-4 h-4 bg-white rounded-full transition ${formData.has_postponement ? "translate-x-[24px]" : ""}`}></span>
                                </label>
                            </div>
                        </div>

                        <div className="w-full mt-3 grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <input
                                    type="tel"
                                    placeholder="Телефон (+7XXXXXXXXXX)"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3"
                                    pattern="^\+7\d{10}$"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Адрес проживания"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3"
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Комментарий (по желанию)"
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 h-full"
                            ></textarea>
                        </div>

                        <div className="mt-6 text-left">
                            <label className="block mb-2 font-medium">
                                Прикрепите документы (1-10 файлов):
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                            />

                            <div className="mt-2">
                                {formData.files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 border rounded mt-1">
                                        <span>{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-6 font-medium w-full rounded-xl bg-custom-yellow py-3 hover:bg-yellow-500 transition-colors"
                        >
                            Отправить заявку
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Conscription