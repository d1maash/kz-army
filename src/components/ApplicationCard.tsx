import Image from "next/image";
import { ApplicationCardType } from "@/store/applicationCards";

const ApplicationCard = ({ 
  application, 
  isSelected, 
  onClick 
  }: { 
    application: ApplicationCardType; 
    isSelected: boolean;
    onClick: () => void;
  }) => {
  return (
    <div 
      onClick={onClick}
      className={`${isSelected ? "bg-custom-yellow" : "bg-[#F1EFEF]"} flex items-center gap-3 p-5 py-7 hover:bg-custom-yellow transition duration-300 ease-in-out rounded-xl overflow-hidden`}
    >
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-medium">{application.title}</h3>
        <p className="text-sm text-black/50">Срок службы: {application.duration}</p>
        <div className="sm:hidden lg:block xl:hidden mx-auto">
            <Image
                src={application.imageSrc}
                alt={application.title}
                width={200}
                height={200}
                className=""
            />
        </div>
        <h3 className="text-lg font-bold mt-3">Преимущества</h3>
        <ul className="text-xs font-medium mt-3 ml-1 list-disc list-inside space-y-1">
          {application.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="hidden sm:block lg:hidden xl:block">
        <Image
          src={application.imageSrc}
          alt={application.title}
          width={200}
          height={200}
          className=""
        />
      </div>
    </div>
  );
};

export default ApplicationCard;