"use client"

import Navbar from "@/components/Navbar"
import { ChevronLeft } from 'lucide-react';
import Link from "next/link";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

const Communication = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        education: "Образование",
        birthDate: "",
        experience: "",
        phone: "",
        email: "",
        comment: "",
        address: "",
    });
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState("")
    const [successPopup, setSuccessPopup] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileData = await api.getProfile();
                setFormData({
                    ...formData,
                    fullName: profileData.full_name || "",
                    birthDate: profileData.birth_date || "",
                    phone: profileData.phone || "",
                    email: profileData.email || "",
                    address: profileData.address || "",
                });
            } catch (err) {
                console.error("Ошибка загрузки профиля:", err);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles(Array.from(selectedFiles));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
          if (!localStorage.getItem('token')) {
            throw new Error('Требуется авторизация');
          }
      
          const formDataToSend = new FormData();
          // ... populate form data ...
          formDataToSend.append("full_name", formData.fullName);
          formDataToSend.append("birth_date", formData.birthDate);
          formDataToSend.append("email", formData.email);
          formDataToSend.append("phone", formData.phone);
          formDataToSend.append("address", formData.address);
          formDataToSend.append("comment", formData.comment);
          formDataToSend.append("education", formData.education);
          formDataToSend.append("communications_experience", formData.experience);
          files.forEach(file => formDataToSend.append("files", file));
      
          const response = await api.createCommunication(formDataToSend);
          console.log("Успешная отправка:", response);
          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
            window.location.href = '/profile';
          }, 3000);
        } catch (error) {
            let errorMessage = "Произошла неизвестная ошибка";
            
            if (error instanceof Error) {
              errorMessage = error.message;
            } else if (typeof error === "string") {
              errorMessage = error;
            }
          
            if (errorMessage === 'Сессия истекла') {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setError("Сессия истекла, войдите снова");
              setTimeout(() => {
                window.location.href = '/auth/login';
              }, 3000);
            } else if (errorMessage === 'Требуется авторизация') {
              setError("Для отправки формы необходимо авторизоваться");
              setTimeout(() => {
                window.location.href = '/auth/login';
              }, 3000);
            } else {
              setError(errorMessage);
            }
          }
      };


    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 mt-20 md:mt-28 flex flex-col min-h-screen">
                <div className="w-full p-10 lg:w-1/2 mx-auto flex flex-col items-center text-center">
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
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-3 "
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
                                <option value="Школьное образование">Школьное образование</option>
                                <option value="Среднее образование">Среднее образование</option>
                                <option value="Высшее образование">Высшее образование</option>
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
                                    backgroundImage: "url('/icons/new-date-icon.svg')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "10px center",
                                    backgroundSize: "20px 20px",
                                }}
                                className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-3 appearance-none"
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
                                    type="text"
                                    placeholder="Контактный телефон"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
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

                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="w-full mt-4 rounded-xl bg-[#F7F7F7] text-[#858585] p-3"
                        />

                        <button type="submit" className="mt-6 font-medium w-full rounded-xl bg-custom-yellow py-3">Отправить заявку</button>
                    </form>

                    {/* Поп-ап для успешной отправки */}
                    {successPopup && (
                        <div className="fixed top-0 left-0 right-0 mt-20 mx-auto w-1/2 bg-green-500 text-white text-center p-4 rounded">
                            Данные успешно отправлены!
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Communication