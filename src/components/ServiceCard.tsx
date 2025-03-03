import Image from "next/image"

const ServiceCard = ({ article }: any) => {
    return (
        <div className="transition duration-300 ease-in-out hover:bg-custom-yellow flex flex-col rounded-xl overflow-hidden bg-[#F1EFEF]">
            <Image
                src={article.image || "/services/service-1.png"}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover"
            />
            <div className="flex flex-col p-5 gap-2">
                <h3 className="font-bold text-lg">{article.title}</h3>
                <p className="text-sm">{article.short_description || article.description}</p>
                {article.published_date &&
                    <p className="text-[#7D7D7D] text-sm">Дата публикации: {new Date(article?.published_date).toLocaleDateString("ru-RU")}</p>
                }
            </div>
        </div>
    )
}

export default ServiceCard