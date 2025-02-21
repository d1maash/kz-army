import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10">
            <div className="text-black font-bold text-lg">KZ ARMY</div>
            <div className="flex gap-6 text-yellow-400 font-medium">
                <Link href="#">О программе</Link>
                <Link href="#">Как подать заявку</Link>
                <Link href="#">Контакты</Link>
            </div>
            <div className="flex gap-3">
                <button className="border border-yellow-400 text-yellow-400 px-4 py-1 rounded-md">Войти</button>
                <button className="bg-yellow-400 text-black px-4 py-1 rounded-md">Регистрация</button>
            </div>
        </nav>
    );
};

export default Navbar 
