import Image from "next/image";
import { FC } from "react";

interface CourseCardProps {
  card: {
    id: number;
    title: string;
    description: string;
    image: string;
  }
  onClick: () => void
}

const CourseCard: FC<CourseCardProps> = ({ card, onClick }) => {
  return (
    <div 
        className="rounded-xl h-64 relative p-4 overflow-hidden bg-black text-white group"
        onClick={onClick}
    >
      {/* Image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={card.image} 
          alt={card.title} 
          width={300} 
          height={300} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300" 
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-[1]" />
      </div>

      <div className="relative pt-3 h-full flex flex-col text-center justify-end z-10">
        <h2 className="font-bold text-custom-yellow mb-2">{card.title}</h2>
        
        {/* Arrow container */}
        <div className="w-3/4 mx-auto group-hover:text-custom-yellow text-white transition-colors duration-300">
          <svg 
            viewBox="0 0 100 16"
            className="w-full h-4"
          >
            <path 
              d="M0 8L90 8" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M90 1L100 8L90 15"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;