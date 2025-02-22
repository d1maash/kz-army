"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

const Application = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const router = useRouter()

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
    }

    const handleSubmit = () => {
        if (selectedOption === "Связист") {
            router.push('/application/communication')
        } else if (selectedOption === "Срочная служба") {
            router.push('/application/conscription')
        } else {
            alert("please select option")
        }
    }
    return (
    <>
        <Navbar />
        <div className="container mx-auto px-5 mt-20 md:mt-28">
            <div className="w-full p-10 md:w-1/3 mx-auto flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold">Подача заявки на службу</h3>
                <p className="text-[#7D7D7D]">Выберите один из вариантов.</p>
            
                <div className="flex justify-center gap-10 text-lg font-semibold mt-12">
                    <button 
                        onClick={() => handleOptionClick("Связист")}
                        className={`${selectedOption === "Связист" && 'border-b-2 border-custom-yellow'}`}
                    >
                        Связист
                    </button>
                    <button 
                        onClick={() => handleOptionClick("Срочная служба")}
                        className={`${selectedOption === "Срочная служба" && 'border-b-2 border-custom-yellow'}`}
                    >
                        Срочная служба
                    </button>
                </div>

                <button 
                    onClick={handleSubmit}
                    className="w-full mt-10 py-3 font-medium bg-custom-yellow rounded-xl "
                >
                    Выбрать
                </button>
            </div>
        </div>
    </>
  )
}

export default Application