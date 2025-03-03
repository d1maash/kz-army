"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSection = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push("/application");
    };

    return (
        <section className="relative w-full min-h-[800px] flex justify-center text-center text-white">
            {/* Background Image */}
            <Image
                src="/hero-image.jpeg"
                alt="Солдат"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full z-[-1]"
            />
            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[-1]"></div>


            {/* Hero */}
            <div className="w-full mt-52 md:mt-60 container mx-auto px-5 flex flex-col items-center ">
                <h1 className="text-4xl md:text-5xl md:text-[4rem] md:w-1/2 font-bold text-custom-yellow">Служить Родине — долг и честь</h1>
                <p className="mt-4 text-base md:text-xl md:w-1/3">Подайте заявку на участие в программах Министерства Обороны</p>
                <button
                    className="mt-16 md:mt-40 w-full border border-custom-yellow text-custom-yellow px-6 py-2 rounded-md text-lg transition-colors duration-300 hover:bg-custom-yellow hover:text-black"
                    onClick={handleButtonClick}
                >
                    Подать заявку
                </button>
            </div>
        </section>
    );
}

export default HeroSection;