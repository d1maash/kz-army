"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Ellipsis } from "lucide-react";
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

const AdminApplication = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [applications, setApplications] = useState<{ count: number, results: any[] }>({ count: 0, results: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 12;

    // MODAL
    const handleNameClick = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    // GET APPLICATIONS
    const handleApplications = async (page = 1) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await api.getApplications(token, page, pageSize);
                setApplications(response);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("Authorization required");
        }
    };
    
    useEffect(() => {
        handleApplications(currentPage);
    }, [currentPage]);

    // SEARCH and PAGINATION 
    const filteredApplications = applications.results.filter(app =>
        app.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredApplications.length / pageSize);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };
    
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    // EXCEL EXPORT
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(applications.results);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
        XLSX.writeFile(workbook, "applications.xlsx");
    };

    // APPLICATION STATUS CHANGE
    const handleStatusChange = async (id: number, newStatus: string) => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error("Authorization required");
            return;
        }
    
        try {
            await api.updateApplicationById(token, id, newStatus);
    
            // Ensure proper type structure
            setApplications(prev => ({
                count: prev.count, // Keep the count unchanged
                results: prev.results.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                ),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between gap-3">
                <input
                    type="text"
                    placeholder="Поиск"
                    className="w-full p-3 pl-10 shadow-sm rounded-xl bg-[#F7F7F7]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleExport} className="flex justify-center gap-3 items-center font-medium bg-custom-yellow rounded-xl p-3 px-6">
                    Экспорт в Excel
                    <Image src="/icons/download-file.svg" alt="download" width={16} height={16} />
                </Button>
            </div>

            <div className="w-full mt-6 text-center bg-white rounded-xl border-2 border-[#C8C8C8] overflow-x-auto">
                <Table className="min-w-[600px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID заявки</TableHead>
                            <TableHead>ФИО</TableHead>
                            <TableHead>Дата подачи</TableHead>
                            <TableHead>Тип заявки</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Действие</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredApplications.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item) => (
                            <TableRow key={item?.id}>
                                <TableCell>{item?.id}</TableCell>
                                <TableCell
                                    className="text-[#033EFF] underline cursor-pointer"
                                    onClick={() => handleNameClick(item)}
                                >
                                    {item?.full_name}
                                </TableCell>
                                <TableCell>{new Date(item?.submitted_at).toLocaleDateString("ru-RU")}</TableCell>
                                <TableCell>{item?.application_type === "conscription" ? "Срочная служба" : "Связист"}</TableCell>
                                <TableCell>
                                    {/* <button className={`rounded-xl font-semibold p-1 px-3 ${
                                        item?.status === "approved" ? "text-[#277C00] bg-[#E0FFD1]" :
                                        item?.status === "in_review" ? "text-[#9F5000] bg-[#FFE7CE]" : "text-[#9F0000] bg-[#FFDCDC]"}`}
                                    >
                                        {item?.status === "in_review" ? "В обработке" : item?.status === "approved" ? "Одобрена" : "Отклонена"}
                                    </button> */}
                                    <div className="relative inline-block">
                                        <button
                                            className={`rounded-xl font-semibold p-1 px-3 w-full text-left ${
                                                item?.status === "approved"
                                                    ? "text-[#277C00] bg-[#E0FFD1]"
                                                    : item?.status === "in_review"
                                                    ? "text-[#9F5000] bg-[#FFE7CE]"
                                                    : "text-[#9F0000] bg-[#FFDCDC]"
                                            }`}
                                        >
                                            {item?.status === "in_review"
                                                ? "В обработке"
                                                : item?.status === "approved"
                                                ? "Одобрена"
                                                : "Отклонена"}
                                        </button>

                                        <select
                                            value={item?.status}
                                            onChange={(e) => handleStatusChange(item?.id, e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        >
                                            <option value="in_review">В обработке</option>
                                            <option value="approved">Одобрена</option>
                                            <option value="rejected">Отклонена</option>
                                        </select>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Ellipsis className="mx-auto size-5" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                                    className={`border-2 ${
                                        currentPage === index + 1 
                                            ? 'border-custom-yellow text-custom-yellow' 
                                            : 'border-[#E8E7DF] hover:border-custom-yellow'
                                    }`}  
                                    onClick={() => setCurrentPage(index + 1)}
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
            {selectedApplication && (
                <ApplicationDetailsModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    application={selectedApplication}
                />
            )}
        </div>
    );
};

export default AdminApplication;
