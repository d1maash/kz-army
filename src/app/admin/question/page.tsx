"use client"

import AdminAnswerCard from "@/components/admin/AdminAnswerCard";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

interface Question {
  id: number;
  question_text: string;
  user_full_name: string;
  profile_name: string;
  answer: string;
  status: string;
}

const AdminQuestion = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [activeAnswerId, setActiveAnswerId] = useState<number | null>(null);
  const toggleAnswer = (id: number) => {
    setActiveAnswerId((prevId) => (prevId === id ? null : id));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Authentication required");
      }

      let page = 1;
      let allResults: Question[] = [];
      let hasMore = true;

      while (hasMore) {
        const response = await api.getQuestions(token, page, pageSize);
        allResults = [...allResults, ...response.results];
        hasMore = !!response.next;
        page++;
      }

      setAllQuestions(allResults);
    } catch (error) {
      console.error("Ошибка загрузки вопросов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleQuestions();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredQuestions = allQuestions.filter((question) =>
    question.question_text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / pageSize);

  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAnswerSubmitted = () => {
    handleQuestions();
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between gap-3">
        <input
          type="text"
          placeholder="Поиск"
          className="w-full p-3 pl-10 shadow-sm rounded-xl bg-[#F7F7F7]"
          style={{
            backgroundImage: "url('/icons/search.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10px center",
            backgroundSize: "20px 20px",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h3 className="mt-6 font-bold text-lg">Вопросы</h3>

      <div className="flex flex-col gap-3">
        {paginatedQuestions.map((question) => (
          <AdminAnswerCard 
            key={question.id}
            id={question.id}
            name={question.user_full_name}
            profile={question.profile_name}
            question={question.question_text}
            answer={question.answer}
            status={question.status}
            onAnswer={handleAnswerSubmitted}
            activeAnswerId={activeAnswerId}
            toggleAnswer={toggleAnswer}
          />
        ))}
      </div>

      <Pagination className="mt-5 mb-5">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 && (
              <PaginationPrevious
                className="border-2 border-[#E8E7DF] hover:border-custom-yellow"
                onClick={handlePrevious}
              />
            )}
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className={`border-2 ${
                  currentPage === index + 1
                    ? "border-custom-yellow text-custom-yellow"
                    : "border-[#E8E7DF] hover:border-custom-yellow"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {currentPage < totalPages && (
              <PaginationNext
                className="border-2 border-[#E8E7DF] hover:border-custom-yellow"
                onClick={handleNext}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminQuestion;