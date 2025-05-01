"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { FC } from "react"

interface ServiceFieldModalProps {
  card: {
    id: number
    title: string
    description: string
    image: string
    intro: string
    bullets: string[]
    advantages: { title: string; description: string }[]
    whatYouGet: { title: string; description: string }[]
  }
  onClose: () => void
}

const ServiceFieldModal: FC<ServiceFieldModalProps> = ({ card, onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-5xl w-full bg-[#E4E4E4]">
          <div className="flex justify-end items-center pr-3 pt-3">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex justify-between gap-2 flex-wrap md:flex-nowrap p-3">
            <div className="flex flex-col md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm md:text-base">{card.description}</p>
            </div>
            <div className="relative rounded-lg h-32 w-full md:w-1/3 mt-4 md:mt-0 overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {card.bullets.map((bullet, index) => (
              <div key={index} className="bg-white min-h-32 rounded-xl p-3 flex flex-col justify-between">
                <h4 className="font-bold text-lg">{bullet.split(' ')[0]}</h4>
                <p className="text-sm">{bullet}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">{card.title} в войсковой части 78460</h3>
            <p className="text-sm">{card.intro}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-xl">Что вы получите?</h2>
            <ul className="flex flex-col gap-4">
              {card.whatYouGet.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 bg-[#13E200] rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-base">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-xl">Преимущества</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {card.advantages.map((advantage, index) => (
                <div key={index} className="border-l-4 border-custom-yellow pl-4">
                  <h3 className="font-bold text-base">{advantage.title}</h3>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceFieldModal