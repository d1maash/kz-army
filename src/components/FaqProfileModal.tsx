import { X } from "lucide-react"

interface FaqProfileCardType {
    name: string;
    close: () => void
}

const FaqProfileModal = ({ name, close }: FaqProfileCardType) => {
  return (
    <div className="fixed top-0 left-0 p-5 w-full h-full bg-black/70 z-20">
        <div className="relative mx-auto mt-40 w-full md:w-2/5 rounded-xl py-8 px-12 bg-white">
            <X 
                className="absolute top-5 right-5"
                size={24} 
                onClick={() => close()}
            />
            <h3 className="">Задать вопрос <strong>{name}</strong></h3>
            <form action="#">
                <textarea 
                    placeholder="Напишите ваш вопрос"
                    className="mt-3 p-3 w-full h-40 rounded-xl bg-[#F7F7F7] "
                />
                <button 
                    className="mt-6 w-full py-2 rounded-xl bg-custom-yellow"
                >
                    Отправить
                </button>
            </form>
        </div>
    </div>
  )
}

export default FaqProfileModal