import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <HeroSection></HeroSection>
        </div>
    );
}
