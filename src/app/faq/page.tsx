import Navbar from "@/components/Navbar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"

const FAQPage = () => {
  return (
    <>
        <Navbar />
        <div className="container mx-auto px-5 mt-20 md:mt-28">
            {/* Line */}
            <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-bold mt-5">Часто задаваемые вопросы</h2>

                <Link href="#" className="hidden md:flex items-center gap-2 bg-custom-yellow rounded-xl p-2 px-4">
                    <Image 
                        src="/icons/telegram-black.svg"
                        alt="telegram"
                        width={30}
                        height={30}
                    />
                    Телеграм бот
                </Link>
            </div>

            {/* Accordion */}
            <div className="flex flex-wrap md:flex-nowrap">
                <form action="#" className="mt-5">
                    <input 
                        type="text" 
                        placeholder="Поиск"
                        style={{
                            backgroundImage: "url('/icons/search.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "10px center", 
                            backgroundSize: "20px 20px", 
                        }}
                        className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10 "
                    />
                    <select
                        name="education"
                        className="w-full mt-3 rounded-xl bg-[#F7F7F7] text-black p-3 appearance-none"
                        style={{
                            backgroundImage: "url('/icons/down-arrow.svg')", // Add a custom dropdown arrow
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 15px center",
                            backgroundSize: "10px 10px",
                        }}
                    >
                        <option value="">
                            Направление
                        </option>
                        <option value="option1">Связист</option>
                        <option value="option2">Срочная служба</option>
                    </select>

                    <button className="mt-6 font-medium w-full rounded-xl bg-custom-yellow py-3">Применить</button>
                </form>


                <Accordion type="single" collapsible className="w-full mt-5 md:px-5">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">Как подать заявку?</AccordionTrigger>
                        <AccordionContent className="text-base">
                            Заявку можно подать онлайн через наш сайт или лично в военкомате. Нужно заполнить анкету, прикрепить документы и дождаться обратной связи.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg font-semibold">Сколько времени рассматривается заявка?</AccordionTrigger>
                        <AccordionContent className="text-base">
                            Обычно проверка документов и первичная проверка занимает до 10 рабочих дней.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-lg font-semibold">Что делать после подачи заявки?</AccordionTrigger>
                        <AccordionContent className="text-base">
                            Если ваша заявка одобрена, вас пригласят на собеседование, медицинское обследование и тестирование.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

                <Link href="/faq/profiles" className="fixed right-20 bottom-10 animate-bounce text-center font-medium w-full max-w-[200px] rounded-xl bg-custom-yellow py-3">Задать вопрос</Link>
        </div>
    </>
  )
}

export default FAQPage