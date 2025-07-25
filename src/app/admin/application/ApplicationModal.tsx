"use client"

import { X, MoreVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { ApplicationType } from './types';
import toast from "react-hot-toast";

interface ApplicationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    application: ApplicationType;
    onStatusChange: (id: number, status: string) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
    isOpen,
    onClose,
    application,
    onStatusChange,
    onDelete
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    if (!isOpen) return null;

    const handleStatusChange = async (newStatus: string) => {
        try {
            await onStatusChange(application.id, newStatus);
            onClose();
            toast.success('Статус заявки успешно изменен');
        } catch (error) {
            console.error('Failed to update status:', error);
            toast.error('Ошибка при изменении статуса заявки');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту заявку?');
        if (confirmDelete) {
            try {
                await onDelete(application.id);
                onClose();
                toast.success('Заявка успешно удалена');
            } catch (error) {
                console.error('Failed to delete application:', error);
                toast.error('Ошибка при удалении заявки');
            }
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white mx-3 p-6 rounded-lg w-full max-w-md">
                <X className="absolute top-3 right-3" onClick={onClose} />
                <div className="flex items-center gap-3">
                    <Image
                        src="/Ivan.png"
                        alt="ivan"
                        width={50}
                        height={50}
                    />
                    <div className="flex flex-col justify-center">
                        <h3><strong>{application.full_name}</strong></h3>
                        <p>{application.application_type === "conscription" ? "Срочная служба" : "Контрактник"}</p>
                    </div>
                    <div className="relative">
                        <MoreVertical 
                            className="cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <button
                                    onClick={() => handleStatusChange('in_review')}
                                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                >
                                    В обработке
                                </button>
                                <button
                                    onClick={() => handleStatusChange('approved')}
                                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                >
                                    Одобрена
                                </button>
                                <button
                                    onClick={() => handleStatusChange('rejected')}
                                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                >
                                    Отклонена
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                                >
                                    Удалить заявку
                                </button>
                            </div>
                        )}
                    </div>

                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                        <div>ФИО</div>
                        <div><strong>{application.full_name}</strong></div>
                    </div>
                    <div className="flex flex-col">
                        <div>Контактные данные</div>
                        <div><strong>{application.phone}</strong></div>
                    </div>
                    <div className="flex flex-col">
                        <div>Дата рождения</div>
                        <div><strong>{application.birth_date}</strong></div>
                    </div>
                    <div className="flex flex-col">
                        <div>Адрес проживания</div>
                        <div><strong>{application.address}</strong></div>
                    </div>
                    <div className="flex flex-col">
                        <div>ИИН</div>
                        <div><strong>010101010101</strong></div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mt-4 bg-custom-yellow text-black font-semibold py-2 px-4 rounded-lg"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsModal;

