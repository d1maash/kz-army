"use client"

import { api } from "@/utils/api";
import { X } from "lucide-react"
import Image from "next/image";
import { useState } from "react";

interface FaqProfileCardType {
    name: string;
    question: string;
    close: () => void;
    questionId: number;
    onAnswer: () => void;
    initialAnswer?: string;
}

const AnswerModal = ({ 
    name, 
    question, 
    close, 
    questionId, 
    onAnswer,
    initialAnswer = ""
}: FaqProfileCardType) => {
    const [input, setInput] = useState(initialAnswer)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const token = localStorage.getItem("token")
            if (!token) throw new Error("No authentication token")

            await api.answerQuestion(token, questionId, input)
            onAnswer()
            close()
        } catch (error) {
            console.error("Error submitting answer:", error)
            alert(error instanceof Error ? error.message : "Unknown error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed top-0 left-0 p-5 w-full h-full bg-black/70 z-20">
            <div className="relative mx-auto mt-28 md:mt-36 w-full md:w-2/5 rounded-xl py-8 px-12 bg-white">
                <X 
                    className="absolute top-5 right-5 cursor-pointer"
                    size={24} 
                    onClick={close}
                />
                <h3 className="text-lg"><strong>Вопрос для {name}</strong></h3>
                
                <div className="mt-3 flex flex-wrap md:flex-nowrap items-center gap-3">
                    <Image 
                        src="/Ivan.png"
                        alt="ivan"
                        width={40}
                        height={40}
                        className="min-w-10"
                    />
                    <div className="flex flex-col text-sm justify-center">
                        <h3><strong>{name}</strong></h3>
                        <p className="text-xs">{question}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-3">
                    <h3 className="text-lg mt-4"><strong>Ответ</strong></h3>
                    <textarea 
                        placeholder="Напишите ваш ответ"
                        className="p-3 w-full h-40 rounded-xl bg-[#F7F7F7]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                    />
                    <button 
                        className="mt-6 w-full py-2 rounded-xl bg-custom-yellow hover:bg-yellow-500 transition-colors disabled:bg-gray-300"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            "Сохранение..."
                        ) : initialAnswer ? (
                            "Сохранить изменения"
                        ) : (
                            "Ответить"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AnswerModal