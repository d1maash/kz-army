import { X } from "lucide-react"
import Image from "next/image";

interface FaqProfileCardType {
    name: string;
    question: string;
    close: () => void
}

const AnswerModal = ({ name, question, close }: FaqProfileCardType) => {
  return (
    <div className="fixed top-0 left-0 p-5 w-full h-full bg-black/70 z-20">
        <div className="relative mx-auto mt-28 md:mt-36 w-full md:w-2/5 rounded-xl py-8 px-12 bg-white">
            <X 
                className="absolute top-5 right-5"
                size={24} 
                onClick={() => close()}
            />
            <h3 className=""><strong>Вопрос для {name}</strong></h3>
            
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
                    <p className="text-xs">{question} </p>
                </div>
            </div>

            <form action="#" className="mt-3">
                <h3><strong>Ответ</strong></h3>
                <textarea 
                    placeholder="Напишите ваш ответ"
                    className="p-3 w-full h-40 rounded-xl bg-[#F7F7F7] "
                />
                <button 
                    className="mt-6 w-full py-2 rounded-xl bg-custom-yellow"
                >
                    Ответить
                </button>
            </form>
        </div>
    </div>
  )
}

export default AnswerModal