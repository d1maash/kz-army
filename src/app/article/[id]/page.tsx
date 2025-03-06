import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { api } from "@/utils/api";
import Image from "next/image";

interface Params {
    id: string;
}

interface Article {
    id: number;
    title: string;
    content: string;
    published_date: string;
    main_photo: string;
}

export async function generateStaticParams() {
    const articles = await api.getArticles();
    return articles.results.map((article: Article) => ({
        id: article.id.toString(),
    }));
}

export default async function ArticlePage({ params }: { params: Params }) {
    const article = await api.getArticleById(parseInt(params.id));
    console.log(article)

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 md:px-20 mt-20 md:mt-28 flex flex-col">
                {/* Line */}
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <h2 className="text-3xl md:text-4xl font-bold mt-5">{article.title}</h2>
                <p className="text-[#7D7D7D] mt-3">Дата Публикации: {new Date(article.published_date).toLocaleDateString("ru-RU")}</p>

                <Image
                    src={article.main_photo}
                    alt={article.title}
                    width={500}
                    height={300}
                    className="object-cover mt-3 w-full max-h-[500px] rounded-xl"
                />

                <h3 className="text-lg font-bold mt-6">{article.title}</h3>
                <p className="mt-3">{article.short_description}</p>

                {/* Main content */}
                <p className="mt-6">{article.content}</p>
            </div>
            <Footer />
        </>
    );
}