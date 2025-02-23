"use client"

import { useState } from "react";
import Image from "next/image"
import FaqProfileModal from "./FaqProfileModal";

interface FaqProfileCardType {
  name: string;
  role: string;
  image: string
}

const FaqProfileCard = ({ name, role, image }: FaqProfileCardType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      {isModalOpen && <FaqProfileModal name={name} close={handleClose} />}
      <div className="w-full py-3 px-5 flex flex-col items-center justify-center bg-[#F7F7F7] rounded-xl">
        <Image 
          src={image}
          alt="profile"
          width={200}
          height={200}
        />
        <h3 className="mt-3 text-center font-bold text-lg">{name}</h3>
        <p className="text-center font-medium">{role}</p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full font-medium mt-5 py-3 rounded-xl border-2 border-custom-yellow"
        >
          Задать вопрос
        </button>
    </div>
    </>
  )
}

export default FaqProfileCard