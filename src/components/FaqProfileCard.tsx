"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FaqProfileModal from "./FaqProfileModal";

interface FaqProfileCardProps {
  id: number;
  name: string;
  role: string;
  image: string;
  className?: string;
}

const FaqProfileCard: React.FC<FaqProfileCardProps> = ({ id, name, role, image, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <FaqProfileModal 
          profileId={id} 
          name={name} 
          close={() => setIsModalOpen(false)} 
        />
      )}
      <div className={`w-full py-3 px-5 flex flex-col items-center justify-between bg-[#F7F7F7] rounded-xl ${className} group`}>
        <Link href={`/faq/profiles/${id}`}>
          <Image 
            src={image} 
            alt={name} 
            width={200} 
            height={200} 
            className="w-full h-auto object-cover rounded-full" 
          />
          <h3 className="mt-3 text-center font-bold text-lg">{name}</h3>
          <p className="text-center font-medium">{role}</p>
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full font-medium mt-5 py-3 rounded-xl border-2 border-custom-yellow bg-none group-hover:bg-black group-hover:text-custom-yellow transition-colors duration-200"
        >
          Задать вопрос
        </button>
      </div>
    </>
  );
};

export default FaqProfileCard;
