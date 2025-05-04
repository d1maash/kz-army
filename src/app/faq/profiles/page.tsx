// app/ask-question/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FaqProfileCard from "@/components/FaqProfileCard";
import { api } from "@/utils/api";
import Footer from "@/components/Footer";

interface Profile {
    id: number;
    name: string;
    position: string;
    photo: string;
}

const AskQuestion = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleProfiles = async () => {
        try {
            const response = await api.getProfiles();
            setProfiles(response.results);
        } catch (err) {
            console.error(err);
            setError("Ошибка загрузки данных");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleProfiles();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div className="text-red-500 p-5">{error}</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto px-5 mt-20 md:mt-28 flex-grow">
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <h2 className="text-3xl md:text-4xl font-bold mt-5">
                    Вопросы к представителям войсковой части
                </h2>

                <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {profiles.map((profile) => (
                        <FaqProfileCard
                            key={profile.id}
                            id={profile.id}
                            name={profile.name}
                            role={profile.position}
                            image={profile.photo}
                            className="hover:scale-105 hover:bg-custom-yellow transition-transform duration-200"
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AskQuestion;
