"use client"

import AnswerModal from "@/app/admin/question/AnswerModal"
import Image from "next/image"
import { useState } from "react"

interface AdminAnswerType {
    id: number
    name: string;
    profile: string;
    question: string;
}

const AdminAnswerCard = ({ name, profile, question }: AdminAnswerType) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const closeModal = () => {
        setIsModalOpen(false)
    }

  return (
    <>
        {isModalOpen && <AnswerModal name={name} question={question} close={closeModal} />}

        <div className="p-3 flex items-center justify-between  bg-[#F4F4F4] rounded-xl">

            <div className="flex items-center gap-3">
                <Image
                    src="/Ivan.png"
                    alt="ivan"
                    width={40}
                    height={40}
                    className="min-w-10"
                />

                <div className="flex flex-col">
                    {/* Question authors */}
                    <div className="font-bold">
                        {name} ● <span className="text-[#7D7D7D]">Вопрос для {profile}</span>
                    </div>

                    {/* Question content */}
                    <div className="text-xs">
                        {question}
                    </div>
                </div>
            </div>

            <button 
                className="bg-custom-yellow font-semibold rounded-xl p-3 px-4"
                onClick={() => setIsModalOpen(true)}
            >
                Ответить
            </button>
        </div>
    </>
  )
}

export default AdminAnswerCard