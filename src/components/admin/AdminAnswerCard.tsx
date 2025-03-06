"use client"

import AnswerModal from "@/app/admin/question/AnswerModal"
import Image from "next/image"
import { useState } from "react"
import { Trash2, MoreVertical, Eye } from "lucide-react"
import { api } from "@/utils/api"

interface AdminAnswerType {
    id: number
    name: string;
    profile: string;
    question: string;
    answer: string;
    status: string;
    onAnswer: () => void;
    activeAnswerId: number | null;
    toggleAnswer: (id: number) => void;
}

const AdminAnswerCard = ({ id, name, profile, question, answer, status, onAnswer, activeAnswerId, toggleAnswer }: AdminAnswerType) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const isAnswerOpen = activeAnswerId === id

    const closeModal = () => setIsModalOpen(false)

    const handleDelete = async () => {
        try {
            const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот вопрос?")
            if (confirmDelete) {
                await api.deleteQuestionById(id)
                onAnswer()
            }
        } catch (error) {
            console.error("Ошибка при удалении вопроса:", error)
        }
    }

    return (
        <>
            {isModalOpen && (
                <AnswerModal 
                    name={name}
                    question={question}
                    close={closeModal}
                    questionId={id}
                    onAnswer={onAnswer}
                    initialAnswer={answer} // Pass existing answer to modal
                />
            )}

            <div className="flex flex-col justify-center bg-[#F4F4F4] rounded-xl p-3">
                <div className="flex flex-wrap sm:flex-nowrap w-full items-center justify-between ">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/Ivan.png"
                            alt="ivan"
                            width={40}
                            height={40}
                            className="min-w-10"
                        />

                        <div className="flex flex-col">
                            <div className="font-bold">
                                {name} ● <span className="text-[#7D7D7D]">Вопрос для {profile}</span>
                            </div>
                            <div className="text-xs">
                                {question}
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-3 sm:mt-0 items-center gap-2">
                        <button 
                            className={`
                                font-semibold rounded-xl p-3 px-4
                                ${answer === "" ? "bg-custom-yellow" : "bg-[#E0FFD1] text-[#277C00]"}    
                            `}
                            onClick={() => setIsModalOpen(true)}
                        >
                            {answer === "" ? "Ответить" : "Редактировать"}
                        </button>

                        <div className="relative">
                            <button 
                                className="p-2 hover:bg-gray-200 rounded-full"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <MoreVertical size={20} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    {status === 'answered' && 
                                        <button
                                            className="w-full px-4 py-2 text-sm text-[#9F5000] hover:bg-red-50 flex items-center gap-2"
                                            onClick={() => {
                                                toggleAnswer(id)
                                                setIsDropdownOpen(false)
                                            }}
                                        >
                                            <Eye size={16} />
                                            {isAnswerOpen ? "Скрыть ответ" : "Показать ответ"}
                                        </button>
                                    }
                                    <button
                                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                        onClick={handleDelete}
                                    >
                                        <Trash2 size={16} />
                                        Удалить вопрос
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {isAnswerOpen && (
                    <p>{answer}</p>
                )}
            </div>
        </>
    )
}

export default AdminAnswerCard