"use client";

import { use, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { api } from "@/utils/api";
import Image from "next/image";
import Loader from "@/components/Loader";

interface Article {
    id: number;
    title: string;
    short_description: string;
    content: string;
    category: string;
    published_date: string;
    main_photo: string;
}

interface ArticlePageProps {
    params: Promise<{ id: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
    const { id } = use(params)
    const articleId = Number(id)
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isNaN(articleId)) {
            setError("Invalid article ID");
            setLoading(false);
            return;
        }

        const fetchArticle = async () => {
            try {
                const data = await api.getArticleById(articleId);
                setArticle(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load article");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleId]);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28 flex flex-col">
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <h2 className="text-3xl md:text-4xl font-bold mt-5">{article.title}</h2>
                <p className="text-[#7D7D7D] mt-3">
                    Дата Публикации: {new Date(article.published_date).toLocaleDateString("ru-RU")}
                </p>

                <Image
                    src={article.main_photo}
                    alt={article.title}
                    width={1200}
                    height={630}
                    className="object-cover mt-3 w-full h-auto aspect-video rounded-xl"
                    priority
                />

                <div className="prose max-w-none mt-8">
                    <p className="text-lg font-semibold mt-6">{article.short_description}</p>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </div>
            <Footer />
        </>
    );
}