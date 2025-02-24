import Image from "next/image"

interface StepCardType {
    title: string;
    description: string;
    image: string
}

const StepCard = ({ title, description, image }: StepCardType) => {
  return (
    <div className="flex items-center   flex-nowrap gap-5 ml-5">
        <div className="bg-custom-yellow aspect-square rounded-xl  flex justify-center items-center">
            <Image 
                src={image}
                alt={title}
                width={40}
                height={40}
                className="aspect-square m-2 mx-4 md:m-5 inline-block "
            />
        </div>
        <div className="flex flex-col gap-3">
            <h3 className="font-bold text-base md:text-lg">{title}</h3>
            <p className="text-[#7D7D7D] text-xs md:text-sm md:w-3/5">{description}</p>
        </div>
    </div>
  )
}

export default StepCard