"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";

interface FaqProfileModalProps {
  profileId: number; // ID of the employee profile to which the question is addressed
  name: string;
  close: () => void;
}

const FaqProfileModal = ({ profileId, name, close }: FaqProfileModalProps) => {
  const [questionText, setQuestionText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not authenticated");
      router.push('/auth/login/')
      return;
    }

    const formData = new FormData();
    formData.append("profile", profileId.toString());
    formData.append("question_text", questionText);

    try {
      await api.createQuestion(formData);
      setIsSubmitted(true);
      // Wait 2 seconds, then close the modal
      setTimeout(() => {
        close();
      }, 2000);
    } catch (error) {
      console.error("Error posting question:", error);
      // Optionally, display error feedback to the user here
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
    <div className="fixed top-0 left-0 p-5 w-full h-full bg-black/70 z-20">
      <div className="relative mx-auto mt-40 w-full md:w-2/5 rounded-xl py-8 px-12 bg-white">
        <X 
          className="absolute top-5 right-5 cursor-pointer" 
          size={24} 
          onClick={close} 
        />
        <h3>Задать вопрос <strong>{name}</strong></h3>
        <form onSubmit={handleSubmit}>
          <textarea 
            placeholder="Напишите ваш вопрос"
            className="mt-3 p-3 w-full h-40 rounded-xl bg-[#F7F7F7]"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="mt-6 w-full py-2 rounded-xl bg-custom-yellow"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default FaqProfileModal;
