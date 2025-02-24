import Image from "next/image"

interface ImportantCardType {
    title: string
    description: string
    image: string
    isFirstCard?: boolean;
}

const ImportantCard = ({ title, description, image, isFirstCard }: ImportantCardType) => {
  return (
    <div className={`w-[450px] h-52 rounded-xl p-5  flex flex-col justify-center gap-3 items-center 
        ${isFirstCard ? "bg-custom-yellow" : "bg-[#F4F4F4] group hover:bg-custom-yellow transition-colors duration-300"}
    `}>
        <Image
            src={image}
            alt={title}
            width={40}
            height={40}
            className="inline-block mr-3"
        />
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center">{title}</h3>
        <p className="text-xs md:text-sm text-center">{description}</p>
    </div>
  )
}

export default ImportantCard