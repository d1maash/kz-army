import Image from "next/image"

interface ServiceCardType {
    title: string;
    description: string;
    image: string;
    date?: string;
}

const ServiceCard = ({ title, description, image, date }: ServiceCardType) => {
  return (
    <div className="rounded-xl overflow-hidden bg-[#F1EFEF]"> 
    <Image
        src={image}
        alt={title}
        width={800} 
        height={400}
        className="w-full h-48 object-cover"
    />
    <div className="p-5 flex flex-col gap-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm">{description}</p>
        {date && 
            <p className="text-[#7D7D7D] text-sm">{date}</p>
        }
    </div>
</div>
  )
}

export default ServiceCard