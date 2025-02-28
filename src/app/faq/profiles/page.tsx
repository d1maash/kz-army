import FaqProfileCard from "@/components/FaqProfileCard"
import Navbar from "@/components/Navbar"
import { faqProfileCards } from "@/store/faqProfileCards"
// import FaqProfileModal from "@/components/FaqProfileModal"

const AskQuestion = () => {
  return (
    <>
        <Navbar />
        {/* <FaqProfileModal /> */}
        <div className="container mx-auto px-5 mt-20 md:mt-28">
            {/* Line */}
            <div className="border-t-[12px] border-custom-yellow w-1/5"></div>
            <h2 className="text-3xl md:text-4xl font-bold mt-5">Вопросы представителям министерства обороны</h2>

            <div className="mt-5 grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {faqProfileCards.map((profile) => (
                    <FaqProfileCard 
                        key={profile.id}
                        name={profile.name}
                        role={profile.role}
                        image={profile.image}
                    />
                ))}
            </div>
        </div>
    </>
  )
}

export default AskQuestion