"use client"

import Navbar from "@/components/Navbar"
import { ChevronLeft } from 'lucide-react';
import Link from "next/link";
import { api } from "@/utils/api";
import { useState } from "react";

const Communication = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        education: "Образование",
        birthDate: "",
        experience: "",
        phone: "",
        email: "",
        comment: "",
    });
    const [error, setError] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data:", formData)
        try {
            const response = await api.post("/applications/applications/communications", formData);
            console.log("Успешный отправка:", response.data);
          } catch (err: any) {
            console.error("Ошибка отправки:", err.response?.data || err.message);
            setError(err.response?.data?.detail || "Ошибка отправки");
          }
    }


  return (
    <>
        <Navbar />
        <div className="container mx-auto px-5 mt-20 md:mt-28">
            <div className="w-full  p-10 lg:w-1/2 mx-auto flex flex-col items-center text-center">
                <div className="w-full flex justify-between items-center">
                    <Link href="/application"><ChevronLeft /></Link>
                    <h3 className="text-2xl font-bold">Форма для &quot;Связиста&quot;</h3>
                    <div className=""></div>
                </div>
                <p className="text-[#7D7D7D] mt-2">Заполните данные</p>
                
                {/* FORM */}
                <form action="#" onSubmit={handleSubmit} className="w-full mt-6">
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {/* ФИО и Образование */}
                    <div className="w-full grid md:grid-cols-2 gap-6">
                        <input 
                            type="text" 
                            placeholder="ФИО"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            style={{
                                backgroundImage: "url('/icons/user.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "10px center", 
                                backgroundSize: "20px 20px", 
                            }}
                            className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10 "
                        />
                        {/* SElECT */}
                        <select
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            className="w-full rounded-xl bg-[#F7F7F7] text-black p-3 appearance-none"
                            style={{
                                backgroundImage: "url('/icons/down-arrow.svg')", // Add a custom dropdown arrow
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 15px center",
                                backgroundSize: "10px 10px",
                            }}
                        >
                            <option value="Образование">
                                Образование
                            </option>
                            <option value="option1">Вариант 1</option>
                            <option value="option2">Вариант 2</option>
                            <option value="option3">Вариант 3</option>
                        </select>
                    </div>

                    {/* Дата рождения и опыт работы */}
                    <div className="w-full mt-3 grid md:grid-cols-2 gap-6">
                        <input 
                            type="date" 
                            placeholder="Дата рождения"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            style={{
                                backgroundImage: "url('/icons/date.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "10px center", 
                                backgroundSize: "20px 20px", 
                            }}
                            className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10 appearance-none"
                            onFocus={(e) => (e.target.type = "date")} // Show date picker on focus
                            onBlur={(e) => (e.target.type = "text")} // Show placeholder on blur
                            required // Required for the :invalid selector to work
                        />

                        <input 
                            type="text" 
                            placeholder="Опыт работы в сфере связи"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 "
                        />

                    </div>

                    {/* Контактные данные и Комментарий */}
                    <div className="w-full mt-3 grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-3">
                            <input 
                                type="number"
                                placeholder="Контактный телефон"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 "
                            />
                            <input 
                                type="email"
                                placeholder="Электронная почта"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 "
                            />
                        </div>
                        <textarea 
                            placeholder="Комментарий (по желанию)"
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3"
                        ></textarea>
                    </div>

                    <button type="submit" className="mt-6 font-medium w-full rounded-xl bg-custom-yellow py-3">Отправить заявку</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Communication