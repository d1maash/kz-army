"use client"

import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import ImportantCard from "@/components/ImportantCard";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import StepCard from "@/components/StepCard";
import { importantCards } from "@/store/importantCards";
import { stepCards } from "@/store/stepCards";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

interface Article {
    id: number;
    title: string;
    short_description: string;
    content: string;
    category: string;
    published_date: string;
    main_photo: string;
}

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]) // Store all articles
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await api.getArticles()
                console.log(data)
                setArticles(data.results) // Store the full list
            } catch (error) {
                const err = error as Error; // Приведение типа
                setError(err.message || "Ошибка загрузки")
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [])

    if (loading) return <Loader />

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
                    {error && <p>{error}</p>}
                    {articles.slice(0, 4).map((article) => (
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
