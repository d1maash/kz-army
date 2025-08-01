"use client"

import Navbar from "@/components/Navbar"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { api } from "@/utils/api"
import { useState, useEffect } from "react"
import Footer from "@/components/Footer"

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
    const [successPopup, setSuccessPopup] = useState(false);

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
                setProfile(null)
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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length === 0) {
            setFormData({ ...formData, phone: "+7" });
        } else if (value.startsWith("+7") && value.length <= 13) {
            setFormData({ ...formData, phone: value });
        } else if (value.startsWith("+7") && value.length > 13) {
            setFormData({ ...formData, phone: value.slice(0, 13) });
        } else {
            setFormData({ ...formData, phone: "+7" + value.replace(/\D/g, "").slice(2) });
        }
    };

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

        if (!localStorage.getItem('token')) {
            setError("Вы не авторизованы")
            setTimeout(() => {
                window.location.href = '/auth/login'
            }, 3000)
            return
        }

        if (formData.files.length === 0) {
            setError("Необходимо прикрепить хотя бы один файл")
            return
        }

        const form = new FormData()
        form.append("full_name", formData.full_name)
        form.append("birth_date", formData.birth_date)
        form.append("email", formData.email)
        form.append("phone", formData.phone)
        form.append("address", formData.address)
        form.append("comment", formData.comment)
        form.append("has_postponement", String(formData.has_postponement))

        formData.files.forEach((file) => {
            form.append("files", file)
        })

        try {
            const response = await api.postFormData(
                "/applications/applications/conscription/",
                form
            )

            console.log("Успешная отправка:", response)
            setSuccessPopup(true)
            setTimeout(() => {
                setSuccessPopup(false)
                window.location.href = '/profile'
            }, 3000)

        } catch (err: any) {
            console.error("Ошибка отправки:", err)
            if (err.message.includes("У вас уже есть активная заявка")) {
                setError("Вы уже отправили заявку")
                setTimeout(() => {
                    window.location.href = '/profile'
                }, 3000)
            } else if (err.message.includes("401")) {
                setError("Вы не авторизованы")
                setTimeout(() => {
                    window.location.href = '/auth/login'
                }, 3000)
            } else {
                setError(err.message || "Ошибка отправки заявки")
            }
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 mt-20 md:mt-28 flex flex-col min-h-screen">
                
                {/*<div className="w-full p-10 lg:w-1/2 mx-auto flex flex-col items-center text-center">
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
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-3"
                                style={{
                                    backgroundImage: "url('/icons/new-user-icon.svg')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "10px center",
                                    backgroundSize: "20px 20px",
                                }}
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
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-3"
                                style={{
                                    backgroundImage: "url('/icons/new-date-icon.svg')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "10px center",
                                    backgroundSize: "20px 20px",
                                }}
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
                                    type="text"
                                    placeholder="Контактный телефон"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3"
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

                        {successPopup && (
                            <div className="fixed top-0 left-0 right-0 mt-20 mx-auto w-1/2 bg-green-500 text-white text-center p-4 rounded">
                                Данные успешно отправлены!
                            </div>
                        )}
                    </form>
                </div> */}

                <div className="w-full p-10 md:w-1/2 lg:w-2/5 mx-auto flex flex-col items-center text-center bg-gray-200 rounded-xl opacity-70 cursor-not-allowed">
                    <h3 className="text-2xl font-bold text-gray-500">Подача заявок временно недоступна</h3>
                    <p className="text-[#A0A0A0] mt-4 text-lg">Функционал подачи заявки находится в разработке.<br/>Пожалуйста, следите за обновлениями!</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Conscription