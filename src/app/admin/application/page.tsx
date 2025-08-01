"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Ellipsis, Trash2 } from "lucide-react";
import { api } from "@/utils/api";
import ApplicationDetailsModal from "./ApplicationModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ApplicationType } from "./types";
import toast from "react-hot-toast";

const AdminApplication = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Delete dropdown state
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationType | null>(null);
  // Applications state holds all fetched applications
  const [allApplications, setAllApplications] = useState<ApplicationType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pageSize = 12;

  // MODAL handlers
  const handleNameClick = (application: ApplicationType) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  // GET APPLICATIONS
  const handleApplications = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        let page = 1;
        let allResults: ApplicationType[] = [];

        while (true) {
          const response = await api.getApplications(token, page, pageSize);
          allResults = [...allResults, ...response.results];

          if (!response.next) break;
          page++;
        }

        setAllApplications(allResults);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Authorization required");
    }
  };

  useEffect(() => {
    handleApplications();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // SEARCH and PAGINATION 
  const filteredApplications = allApplications.filter((app) =>
    app.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplications.length / pageSize);

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Pagination handlers
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

  // EXCEL EXPORT
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredApplications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "applications.xlsx");
  };

  // APPLICATION STATUS CHANGE
  const handleStatusChange = async (id: number, newStatus: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization required");
      return;
    }
    try {
      await api.updateApplicationById(id, newStatus);
      setAllApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      toast.success('Статус заявки успешно изменен')
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при изменении статуса заявки')
    }
  };

  // DELETE APPLICATION
  const handleDelete = async (id: number) => {
    try {
      await api.deleteApplicationById(id);
      setAllApplications((prev) => prev.filter((app) => app.id !== id));
      toast.success('Заявка успешно удалена')
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error('Ошибка при удалении заявки')
    }
  };

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
        <Button
          onClick={handleExport}
          className="flex justify-center gap-3 items-center font-medium bg-custom-yellow rounded-xl p-3 px-6"
        >
          Экспорт в Excel
          <Image src="/icons/download-file.svg" alt="download" width={16} height={16} />
        </Button>
      </div>

      <div className="w-full mt-6 text-center bg-white rounded-xl border-2 border-[#C8C8C8] ">
        <Table className="min-w-[600px] w-full overflow-x-visible">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">ID заявки</TableHead>
              <TableHead className="text-center">ФИО</TableHead>
              <TableHead className="text-center">Дата подачи</TableHead>
              <TableHead className="text-center">Тип заявки</TableHead>
              <TableHead className="text-center">Статус</TableHead>
              <TableHead className="text-center">Действие</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedApplications.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell
                  className="text-[#033EFF] underline cursor-pointer"
                  onClick={() => handleNameClick(item)}
                >
                  {item.full_name}
                </TableCell>
                <TableCell>{new Date(item.submitted_at).toLocaleDateString("ru-RU")}</TableCell>
                <TableCell>
                  {item.application_type === "conscription" ? "Срочная служба" : "Контрактник"}
                </TableCell>
                <TableCell>
                  <div className="relative inline-block">
                    <button
                      className={`rounded-xl font-semibold p-1 px-3 w-full text-left ${
                        item.status === "approved"
                          ? "text-[#277C00] bg-[#E0FFD1]"
                          : item.status === "in_review"
                          ? "text-[#9F5000] bg-[#FFE7CE]"
                          : "text-[#9F0000] bg-[#FFDCDC]"
                      }`}
                    >
                      {item.status === "in_review"
                        ? "В обработке"
                        : item.status === "approved"
                        ? "Одобрена"
                        : "Отклонена"}
                    </button>
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    >
                      <option value="in_review">В обработке</option>
                      <option value="approved">Одобрена</option>
                      <option value="rejected">Отклонена</option>
                    </select>
                  </div>
                </TableCell>
                <TableCell className="text-center relative">
                  <div
                    className="inline-block cursor-pointer p-2"
                    onClick={() =>
                      setOpenDropdown((prev) => (prev === item.id ? null : item.id))
                    }
                  >
                    <Ellipsis className="mx-auto" size={20} />
                  </div>
                  {openDropdown === item.id && (
                    <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded-lg p-2 z-10">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-2 px-3 py-2 font-semibold text-red-600 hover:bg-red-100 rounded-md"
                      >
                        <Trash2 size={16} />
                        Удалить
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      {selectedApplication && (
        <ApplicationDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          application={selectedApplication}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminApplication;
