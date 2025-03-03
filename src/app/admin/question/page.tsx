"use client"

import AdminAnswerCard from "@/components/admin/AdminAnswerCard"
import { testQuestions } from "./testQuestion"

const AdminQuestion = () => {

    return (
    <div>
        <div className="flex justify-between gap-3">
                <input
                    type="text"
                    placeholder="Поиск"
                    className="w-full p-3 pl-10 shadow-sm rounded-xl bg-[#F7F7F7]"
                    style={{
                        backgroundImage: "url('/icons/search.svg')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "10px center",
                        backgroundSize: "20px 20px",
                    }}
                />
        </div>

        <h3 className="mt-6 font-bold text-lg">Вопросы</h3>

        <div className="flex flex-col gap-3">
            {testQuestions.map((question) => (
                    <AdminAnswerCard 
                        key={question.id}
                        id={question.id}
                        name={question.name}
                        profile={question.profile}
                        question={question.question}
                    />
            ))}
        </div>
    </div>
  )
}

export default AdminQuestion