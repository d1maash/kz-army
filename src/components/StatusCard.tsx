interface ApplicationStatus {
    application_type?: string;
    application_type_display?: string;
    comment?: string;
    id?: number;
    status?: string;
    status_display?: string;
    submitted_at?: string;
}

const StatusCard = ({
    application_type_display,
    status_display,
    submitted_at
}: ApplicationStatus) => {
  return (
    <div className="max-w-80 flex gap-2 flex-col border-2 border-[#C8C8C8] rounded-xl p-4">
        <h3 className="font-bold text-lg">{application_type_display}</h3>
        <p className="text-sm">Дата подачи заявки: {submitted_at ? new Date(submitted_at).toLocaleDateString() : "Не указана"}</p>
        <p className="text-sm">Отслеживания этапов рассмотрения: <strong>Проверка документов</strong></p>
        <div className="flex items-center gap-2">
            <p className="text-sm">Статус Заявки:</p>
            <div className={`rounded-xl p-2 px-3 text-sm font-bold 
                ${status_display === "Одобрена" || status_display === "Создана" ? 
                "text-[#277C00] bg-[#E0FFD1]" :
                status_display === "На рассмотрении" ?
                "text-[#9F5000] bg-[#FFE7CE]" :
                "text-[#9F0000] bg-[#FFDCDC]"
                }    
            `}>
                {status_display}
            </div>
        </div>
    </div>
  )
}

export default StatusCard