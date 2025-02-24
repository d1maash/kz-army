import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ApplicationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    application: {
        id: string;
        name: string;
        date: string;
        type: string;
        status: string;
    };
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
    isOpen,
    onClose,
    application,
}) => {
    if (!isOpen) return null;

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
                        <h3><strong>{application.name}</strong></h3>
                        <p>{application.type === "conscription" ? "Срочная служба" : "Связист"}</p>
                    </div>
                </div>
                
                <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                        <div>ФИО</div>
                        <div><strong>Иванов Иван Иванович</strong></div>
                    </div>
                    <div className="flex flex-col">
                        <div>Контактные данные</div>
                        <div><strong>+7 (777) 777 77 77</strong></div>
                    </div>
                    <div className="flex flex-col">
                        <div>Дата рождения</div>
                        <div><strong>12.02.1997</strong></div>
                    </div>
                    <div className="flex flex-col">
                        <div>Адрес проживания</div>
                        <div><strong>Акмолинская область, г. Астана, Елорда 12</strong></div>
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