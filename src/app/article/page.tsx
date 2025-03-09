"use client"

import Loader from "@/components/Loader"
import Navbar from "@/components/Navbar"
import ServiceCard from "@/components/ServiceCard"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Footer from "@/components/Footer"
import { useSearchParams, useRouter } from "next/navigation"

interface Article {
    id: number | string;
    title: string;
    short_description: string;
    content: string;
    category: string;
    published_date: string;
    main_photo: string;
}

const Article = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState<number>(1)
    
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = 6
    const currentPage = Math.max(1, isNaN(page) ? 1 : page)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await api.getArticles(currentPage, pageSize)
                setArticles(data.results)
                setTotalPages(Math.ceil(data.count / pageSize))
                
                // Update URL without refreshing
                const params = new URLSearchParams(searchParams)
                params.set('page', currentPage.toString())
                router.replace(`?${params.toString()}`, { scroll: false })
                
            } catch (error) {
                const err = error as Error
                setError(err.message || "Ошибка загрузки")
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [currentPage])

    const handlePageChange = (newPage: number) => {
        const validPage = Math.max(1, Math.min(newPage, totalPages))
        if (validPage !== currentPage) {
            setLoading(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handlePrevious = () => handlePageChange(currentPage - 1)
    const handleNext = () => handlePageChange(currentPage + 1)

    if (loading) return <Loader />

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 mt-20 md:mt-28 flex flex-col min-h-screen">
                {/* Line */}
                <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
                <h2 className="text-3xl md:text-4xl font-bold mt-5">Полезные статьи и новости</h2>
                <p className="mt-3 text-lg md:text-xl text-[#7D7D7D]">
                    Будьте в курсе актуальных событий, полезных советов и важных обновлений о службе.
                </p>

                <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {error && <p>{error}</p>}
                    {articles.map((article: Article) => (
                        <ServiceCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination className="mt-5">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="border-2 border-[#E8E7DF] hover:border-custom-yellow"
                                onClick={handlePrevious}
                                // disabled={currentPage === 1}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    className={`border-2 ${currentPage === index + 1
                                        ? "border-custom-yellow text-custom-yellow"
                                        : "border-[#E8E7DF] hover:border-custom-yellow"
                                        }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                className="border-2 border-[#E8E7DF] hover:border-custom-yellow"
                                onClick={handleNext}
                                // disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <Footer />
        </>
    )
}

export default Article
