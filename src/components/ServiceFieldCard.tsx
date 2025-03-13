import Image from "next/image";
import { FC } from "react";

interface ServiceFieldCardProps {
  card: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  onClick: () => void;
}

const ServiceFieldCard: FC<ServiceFieldCardProps> = ({ card, onClick }) => {
  return (
    <div 
        className="rounded-xl h-64 relative p-4 overflow-hidden bg-black text-white group"
        onClick={onClick}
    >
      <Image 
        src={card.image} 
        alt={card.title} 
        width={300} 
        height={300} 
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity duration-300" 
      />
      <div className="relative pt-3 h-full flex flex-col justify-between z-10">
        <h2 className="font-bold text-xl">{card.title}</h2>
        <p className="text-sm text-white/70">{card.description}</p>
      </div>
    </div>
  );
};

export default ServiceFieldCard;