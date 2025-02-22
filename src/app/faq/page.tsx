import Navbar from "@/components/Navbar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const FAQPage = () => {
  return (
    <>
        <Navbar />
        <div className="container mx-auto px-5 mt-20 md:mt-28">
            {/* Line */}
            <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-5">Подходите ли вы для службы в Армии РК?</h2>
            <p className="mt-3 text-lg md:text-xl text-[#7D7D7D]">Ответы на часто задаваемые вопросы.</p>

            {/* Accordion */}
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
    </>
  )
}

export default FAQPage