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
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const AdminApplication = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [applications, setApplications] = useState({ count: 0, results: [] });

    useEffect(() => {
        handleApplications();
    }, []);

    const handleNameClick = (application: any) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    const handleApplications = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const applications = await api.getApplications(token);
                setApplications(applications);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("Authorization required");
        }
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(applications.results);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
        XLSX.writeFile(workbook, "applications.xlsx");
    };

    return (
        <div>
            <div className="flex justify-between gap-3">
                <form action="#" className="w-full">
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
                    />
                </form>
                <Button onClick={handleExport} className="flex justify-center gap-3 items-center font-medium bg-custom-yellow rounded-xl p-3 px-6">
                    Экспорт в Excel
                    <Image src="/icons/download-file.svg" alt="download" width={16} height={16} />
                </Button>
            </div>

            <div className="w-full mt-6 text-center bg-white rounded-xl border-2 border-[#C8C8C8] overflow-x-auto">
                <Table className="min-w-[600px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-black text-center font-bold">ID заявки</TableHead>
                            <TableHead className="text-black text-center font-bold">ФИО</TableHead>
                            <TableHead className="text-black text-center font-bold">Дата подачи</TableHead>
                            <TableHead className="text-black text-center font-bold">Тип заявки</TableHead>
                            <TableHead className="text-black text-center font-bold">Статус</TableHead>
                            <TableHead className="text-black text-center font-bold">Действие</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.results.map((item) => (
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
                                    <button
                                        className={`rounded-xl font-semibold p-1 px-3 ${item?.status === "accepted" ?
                                            "text-[#277C00] bg-[#E0FFD1]" :
                                            item?.status === "in_review" ? "text-[#9F5000] bg-[#FFE7CE]" : "text-[#9F0000] bg-[#FFDCDC]"}`}
                                    >
                                        {item?.status === "in_review" ? "В обработке" : item?.status === "accepted" ? "Одобрена" : "Отклонена"}
                                    </button>
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
                            <PaginationPrevious className="border-[#E8E7DF] border-2" href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="border-custom-yellow border-2 text-custom-yellow" href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="border-[#E8E7DF] border-2" href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis className="border-[#E8E7DF] border-2 rounded-md" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="border-[#E8E7DF] border-2" href="#">9</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="border-[#E8E7DF] border-2" href="#">10</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext className="border-[#E8E7DF] border-2" href="#" />
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