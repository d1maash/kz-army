import { applicationData } from '@/store/applicationCards';
import { conscriptionAdvantagesCards } from '@/store/advantagesCards';
import AdvantageCard from '@/components/AdvantageCard';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const conscription = applicationData.find(a => a.type === 'conscription');

const Page = () => {
  if (!conscription) return null;
  return (
    <>
    <Navbar />

    <div className="container mx-auto px-5 md:px-20 mt-28 md:mt-32">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{conscription.title}</h1>
      <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
        <Image src={conscription.imageSrc} alt={conscription.title} width={300} height={200} className="rounded-xl" />
        <div>
          <p className="text-lg font-semibold mb-2">Срок службы: {conscription.duration}</p>
          <h2 className="text-xl font-bold mb-2">Преимущества</h2>
          <ul className="list-disc list-inside space-y-1">
            {conscription.benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Дополнительные преимущества</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {conscriptionAdvantagesCards.map((adv, i) => (
          <AdvantageCard key={i} advantage={adv} />
        ))}
      </div>
    </div>

    <Footer />
    </>
  );
}

export default Page;