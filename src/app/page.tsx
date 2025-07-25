"use client"

import AdvantageCard from "@/components/AdvantageCard";
import ApplicationCard from "@/components/ApplicationCard";
import CourseCard from "@/components/CourseCard";
import CourseModal from "@/components/CourseModal";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import ImportantCard from "@/components/ImportantCard";
import Navbar from "@/components/Navbar";
import ServiceFieldCard from "@/components/ServiceFieldCard";
import ServiceFieldModal from "@/components/ServiceFieldModal";
import StepCard from "@/components/StepCard";
import { conscriptionAdvantagesCards, communicationAdvantageCards } from "@/store/advantagesCards";
import { applicationData } from "@/store/applicationCards";
import { courseCards } from "@/store/courseCards";
import { importantCards } from "@/store/importantCards";
import { serviceFieldCards } from "@/store/serviceFieldCards";
import { stepCards } from "@/store/stepCards";
import { useState } from "react";

export default function Home() {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [selectedServiceField, setSelectedServiceField] = useState<number | null>(null)
    const [selectedApplication, setSelectedApplication] = useState<"conscription" | 'communication' | null>(null)

    return (
        <div>
            <Navbar isHome={true}></Navbar>
            <HeroSection></HeroSection>

            {/* Служба */}
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                {/* Line */}
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <h2 className="text-4xl md:text-5xl font-bold mt-5">Войсковая часть 78460</h2>
                <p className="text-[#7D7D7D] text-sm mt-5 md:w-2/5">Присоединяйтесь к 78460 войсковой части и получите не только бесценный военный опыт, но и востребованные навыки, которые пригодятся вам в жизни и карьере.</p>
            
                {/* Service Cards */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 justify-center">
                    {serviceFieldCards.map((card) => (
                        <ServiceFieldCard 
                            key={card.id} 
                            card={card} 
                            onClick={() => setSelectedServiceField(card.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Подготовка Военнослужащих */}
            <div className="container mx-auto md:px-20 mt-20 md:mt-28">
                <h2 className="text-4xl md:text-5xl text-center font-bold mt-5">Подготовка Военнослужащих</h2>
                <div className="mt-10 mx-5 md:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 justify-center">
                    {courseCards.map((card) => (
                        <CourseCard 
                            key={card.id} 
                            card={card} 
                            onClick={() => setSelectedCourse(card.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Почему это важно ? */}
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28">
                {/* Line */}
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <h2 className="text-4xl md:text-5xl font-bold mt-5">Почему это важно?</h2>
                <p className="text-[#7D7D7D] text-sm mt-5 md:w-2/5">Министерство Обороны предоставляет возможность каждому гражданину внести свой вклад в защиту Родины. Подайте заявку на участие в военных и контрактных программах.</p>

                {/* Cards */}
                <div className="mt-10 flex justify-center gap-5 items-center flex-wrap lg:flex-nowrap">
                    {importantCards.map((card) => (
                        <ImportantCard
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
                <div className="mt-20 grid lg:grid-cols-2 justify-center items-center gap-10">
                    {/* Conscription Card */}
                    <a href="/conscription" className="block">
                        <ApplicationCard 
                            application={applicationData.find(a => a.type === 'conscription')!}
                            isSelected={false}
                            onClick={() => {}}
                        />
                    </a>
                    {/* Communication Card */}
                    <a href="/communication" className="block">
                        <ApplicationCard 
                            application={applicationData.find(a => a.type === 'communication')!}
                            isSelected={false}
                            onClick={() => {}}
                        />
                    </a>
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

            {/* Footer */}
            <Footer />

            {selectedCourse && (
                <CourseModal 
                    card={courseCards.find(c => c.id === selectedCourse)!}
                    onClose={() => setSelectedCourse(null)}
                />
            )}

            {selectedServiceField && (
                <ServiceFieldModal 
                    card={serviceFieldCards.find(c => c.id === selectedServiceField)!}
                    onClose={() => setSelectedServiceField(null)}
                />
            )}
        </div>
    );
}
