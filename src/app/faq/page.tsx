"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react';

const FAQPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logic to filter questions will be applied here
    };

    const filteredQuestions = [
        {
            id: 'item-1',
            question: 'Как подать заявку?',
            answer: 'Заявку можно подать онлайн через наш сайт или лично в военкомате. Нужно заполнить анкету, прикрепить документы и дождаться обратной связи.'
        },
        {
            id: 'item-2',
            question: 'Сколько времени рассматривается заявка?',
            answer: 'Обычно проверка документов и первичная проверка занимает до 10 рабочих дней.'
        },
        {
            id: 'item-3',
            question: 'Что делать после подачи заявки?',
            answer: 'Если ваша заявка одобрена, вас пригласят на собеседование, медицинское обследование и тестирование.'
        }
    ].filter(item => item.question.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto px-5 mt-20 md:mt-28 flex-grow">
                {/* Line */}
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl md:text-4xl font-bold mt-5">Часто задаваемые вопросы</h2>

                    <Link href="https://t.me/armykz_bot" target="_blank" className="hidden md:flex items-center gap-2 bg-custom-yellow rounded-xl p-2 px-4">
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
                <div className="flex flex-wrap md:flex-nowrap flex-grow">
                    <form onSubmit={handleSearchSubmit} className="mt-5">
                        <input
                            type="text"
                            placeholder="Поиск"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            style={{
                                backgroundImage: "url('/icons/search.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "10px center",
                                backgroundSize: "20px 20px",
                            }}
                            className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10 "
                        />

                        <button className="mt-6 font-medium w-full rounded-xl bg-custom-yellow py-3">Применить</button>
                    </form>

                    <Accordion type="single" collapsible className="w-full mt-5 md:px-5">
                        {filteredQuestions.map(item => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger className="text-lg font-semibold">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-base">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <Link href="/faq/profiles" className="fixed right-20 bottom-10 animate-bounce text-center font-medium w-full max-w-[200px] rounded-xl bg-custom-yellow py-3">Задать вопрос</Link>
            </div>
            <Footer />
        </div>
    )
}

export default FAQPage