"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { api } from "@/utils/api";
// import { useRouter } from "next/navigation";

interface FaqProfileModalProps {
  profileId: number;
  name: string;
  close: () => void;
}

const FaqProfileModal = ({ profileId, name, close }: FaqProfileModalProps) => {
  const [questionText, setQuestionText] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("profile", profileId.toString());
    formData.append("question_text", questionText);
  
    if (!token) {
      if (!userName || !userEmail) {
        alert("Для неавторизованных пользователей обязательны имя и email");
        return;
      }
      formData.append("user_name", userName);
      formData.append("user_email", userEmail);
    }
  
    try {
      await api.createQuestion(formData);
      setIsSubmitted(true);
      setTimeout(() => close(), 2000);
    } catch (error) {
      console.error("Error posting question:", error);
      alert(error instanceof Error ? error.message : "Произошла ошибка");
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed top-0 left-0 p-5 w-full h-full bg-black/70 z-20 flex items-center justify-center">
        <div className="bg-white rounded-xl py-10 px-12 flex flex-col items-center">
          <Check size={60} className="text-custom-yellow" />
          <p className="mt-4 font-semibold">Ваш вопрос успешно отправлен!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 p-5 w-full h-full bg-black/70 z-20 flex items-center justify-center">
      <div className="relative mx-auto w-full md:w-2/5 rounded-xl py-8 px-12 bg-white">
        <X 
          className="absolute top-5 right-5 cursor-pointer" 
          size={24} 
          onClick={close} 
        />
        <h3>Задать вопрос <strong>{name}</strong></h3>
        <form onSubmit={handleSubmit} className="mt-4">
          {!token && (
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full p-3 rounded-xl bg-[#F7F7F7]"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Ваш email"
                className="w-full p-3 rounded-xl bg-[#F7F7F7]"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
          )}
          <textarea 
            placeholder="Напишите ваш вопрос"
            className="p-3 w-full h-40 rounded-xl bg-[#F7F7F7]"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="mt-6 w-full py-2 rounded-xl bg-custom-yellow hover:bg-yellow-500 transition-colors"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default FaqProfileModal;