import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import ImportantCard from "@/components/ImportantCard";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import StepCard from "@/components/StepCard";
import { importantCards } from "@/store/importantCards";
import { serviceCards } from "@/store/serviceCards";
import { stepCards } from "@/store/stepCards";
// import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Navbar isHome={true}></Navbar>
            <HeroSection></HeroSection>

            {/* Почему это важно ? */}
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                {/* Line */}
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <h2 className="text-4xl md:text-5xl font-bold mt-5">Почему это важно?</h2>
                <p className="text-[#7D7D7D] text-sm mt-5 md:w-2/5">Министерство Обороны предоставляет возможность каждому гражданину внести свой вклад в защиту Родины. Подайте заявку на участие в военных, контрактных и волонтёрских программах.</p>

                {/* Cards */}
                <div className="mt-10 flex justify-center gap-5 items-center flex-wrap lg:flex-nowrap">
                    {importantCards.map((card, index) => (
                        <ImportantCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                            isFirstCard={index === 0}
                        />
                    ))}
                </div>
            </div>

            {/* Как подать заявку? */}
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                {/* Line */}
                <div className="lg:w-1/2 lg:mx-auto lg:pl-16">
                    <div className="border-t-[12px] border-custom-yellow w-1/3"></div>
                    <h2 className="text-4xl md:text-5xl font-bold mt-5 ">Как подать заявку?</h2>
                </div>

                {/* Steps Cards */}
                <div className="mt-20 grid lg:grid-cols-2 max-w-4xl mx-auto justify-center items-center gap-10">
                    {stepCards.map((card) => (
                        <StepCard 
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                        />
                    ))}
                </div>
            </div>

            {/* Преимущество службы */}
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                {/* Line */}
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <h2 className="text-4xl md:text-5xl font-bold mt-5">Преимущество службы</h2>
                <p className="text-[#7D7D7D] text-sm mt-5 md:w-2/5">Служба в Министерстве Обороны — это стабильная зарплата, соцгарантии, льготное жильё и карьерный рост. Военнослужащие получают медобслуживание, раннюю пенсию и возможность обучения.</p>
                <div className="mt-20 grid lg:grid-cols-2  justify-center items-center gap-10">
                    {serviceCards.map((article) => (
                        <ServiceCard 
                            key={article.id}
                            article={article}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
