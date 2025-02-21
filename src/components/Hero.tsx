import Image from "next/image";
const HeroSection = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
            <Image
                src="/hero-image.jpeg"
                alt="Солдат"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full z-[-1]"
            />
            <div className="max-w-2xl">
                <h1 className="text-5xl font-bold text-yellow-400">Служить Рдине — долг и чест</h1>
                <p className="mt-4 text-lg">Подайте заявку на участие в программах Министерства Обороны</p>
                <button className="mt-6 border border-yellow-400 text-yellow-400 px-6 py-2 rounded-md text-lg">
                    Подать заявку
                </button>
            </div>
        </section>
    );
}

export default HeroSection;