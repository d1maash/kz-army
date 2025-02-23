"use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"

const Application = () => {
    // const [selectedOption, setSelectedOption] = useState<string | null>(null)
    // const router = useRouter()

    // const handleOptionClick = (option: string) => {
    //     setSelectedOption(option)
    // }

    // const handleSubmit = () => {
    //     if (selectedOption === "Связист") {
    //         router.push('/application/communication')
    //     } else if (selectedOption === "Срочная служба") {
    //         router.push('/application/conscription')
    //     } else {
    //         alert("please select option")
    //     }
    // }

    return (
    <>
        <Navbar />
        <div className="container mx-auto px-5 mt-20 md:mt-28">
            <div className="w-full p-10 lg:w-2/5 mx-auto flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold">Подача заявки на службу</h3>
                <p className="text-[#7D7D7D] mt-2">Выберите один из вариантов.</p>
            
                <div className="grid lg:grid-cols-2 gap-3 w-full mt-12">
                   <div className="w-full bg-[#F7F7F7] hover:bg-custom-yellow transition text-start rounded-xl p-4 group">
                        <h3 className="text-2xl font-medium">Связист</h3>
                        <p className="text-sm">Срок службы: От 3 лет (контрактная основа)</p>
                        <Image 
                            src="/communication-bg.png"
                            alt="communication"
                            width={200}
                            height={200}
                            className="mx-auto bg-cover"
                        />
                        <Link href="/application/communication" className="block text-center mt-2 w-full border-2 transition border-custom-yellow group-hover:border-black hover:text-white hover:bg-black rounded-lg py-2">Подать заявку</Link>
                   </div>

                   <div className="w-full bg-[#F7F7F7] hover:bg-custom-yellow transition text-start rounded-xl p-4 group">
                        <h3 className="text-2xl font-medium">Срочная служба</h3>
                        <p className="text-sm">Срок службы: 12 месяцев</p>
                        <Image 
                            src="/conscription-bg.png"
                            alt="communication"
                            width={300}
                            height={300}
                            className="mx-auto mt-8 bg-cover"
                        />
                        <Link href="/application/conscription" className="block mt-5 text-center w-full border-2 transition border-custom-yellow group-hover:border-black hover:text-white hover:bg-black rounded-lg py-2">Подать заявку</Link>
                   </div>
                   
                   
                    {/* <button 
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
                    </button> */}
                </div>

                {/* <button 
                    onClick={handleSubmit}
                    className="w-full mt-10 py-3 font-medium bg-custom-yellow rounded-xl "
                >
                    Выбрать
                </button> */}
            </div>
        </div>
    </>
  )
}

export default Application