import Navbar from "@/components/Navbar"
import ServiceCard from "@/components/ServiceCard"
import { articleCards } from "@/store/articleCards"

const Article = () => {
  return (
    <>
        <Navbar />
        <div className="container mx-auto px-5 mt-20 md:mt-28">
            {/* Line */}
            <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-5">Полезные статьи и новости</h2>
            <p className="mt-3 text-lg md:text-xl text-[#7D7D7D]">Будьте в курсе актуальных событий, полезных советов и важных обновлений о службе.</p>
        
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {articleCards.map((card) => (
                    <ServiceCard 
                        key={card.id}
                        title={card.title}
                        description={card.description}
                        image={card.image}
                        date={card.date}
                    />
                ))}
            </div>
        </div>
    </>
  )
}

export default Article