import { Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="bg-[#292929] mt-32 min-h-60">
            <div className="container mx-auto px-5 md:px-20 py-5">
                <div className="flex flex-wrap gap-20 text-white">
                    {/* Logo */}
                    <Link href="/" className="font-bold text-lg">
                        <Image 
                            src="/new-logo.png"
                            alt="logo"
                            width={50}
                            height={50}
                        />
                    </Link>

                    {/* Contacts */}
                    <ul className="flex flex-col gap-3">
                        <h3 className="font-bold">Наши контакты</h3>
                        <li>+7 705 339 9391</li>
                        <li>+7 700 745 9832</li>
                        <li>+7 700 077 5575</li>
                    </ul>

                    {/* Social */}
                    <ul className="flex flex-col gap-3">
                        <h3 className="font-bold">Наши соц-сети</h3>
                        <Link href="https://t.me/armykz_bot" className="flex gap-1 items-center text-sm">
                            <Image
                                src="/icons/telegram.svg"
                                alt="telegram"
                                width={20}
                                height={20}
                            />
                            @armykz_bot
                        </Link>
                        <Link target="_blank" href="https://www.instagram.com/sarbazpluskz/" className="flex gap-1 items-center text-sm">
                            <Image
                                src="/icons/instagram.svg"
                                alt="telegram"
                                width={20}
                                height={20}
                            />
                            @sarbazpluskz
                        </Link>
                        <Link target="_blank" href="https://www.youtube.com/@sarbazplus" className="flex gap-1 items-center text-sm">
                        <Image
                                src="/icons/youtube.svg"
                                alt="telegram"
                                width={20}
                                height={20}
                            />
                            @SARBAZ+
                        </Link>
                        <Link target="_blank" href="https://www.tiktok.com/@sarbazplus?_t=ZM-8y2e7YrN5fU&_r=1" className="flex gap-1 items-center text-sm">
                            <Image
                                src="/icons/tiktok.svg"
                                alt="telegram"
                                width={20}
                                height={20}
                            />
                            @sarbazplus
                        </Link>
                    </ul>
                </div>

                <div className="mt-12 text-center text-white text-sm">
                    Министерство обороны Республики Казахстан
                </div>
            </div >
        </div >
    )
}

export default Footer