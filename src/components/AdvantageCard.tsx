import Image from "next/image"
import { AdvantageCardType } from "@/store/advantagesCards";


const AdvantageCard = ({ advantage }: { advantage: AdvantageCardType }) => {
    return (
        <div className="min-h-[430px] transition duration-300 ease-in-out hover:bg-custom-yellow flex flex-col rounded-xl overflow-hidden bg-[#F1EFEF]">
            <Image
                src={advantage.image || "/services/service-1.png"}
                alt={advantage.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover"
            />
            <div className="flex flex-col p-5 gap-2">
                <h3 className="font-bold text-lg">{advantage.title}</h3>
                <p className="text-sm">{advantage.description}</p>
            </div>
        </div>
    )
}

export default AdvantageCard