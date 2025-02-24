import Image from "next/image"

const Profile = () => {
  return (
    <div className="fixed top-5 right-5 flex items-center gap-3">
        <div className="flex flex-col">
            <h3 className="font-bold">Иванов Иван</h3>
            <p className="text-[#C8C8C8] text-xs">Администратор</p>
        </div>
        <Image
            src="/Ivan.png"
            alt="ivan"
            width={40}
            height={40}
        />
        <Image 
            src="/icons/down-arrow.svg"
            alt="down-arrow"
            width={10}
            height={10}
        />
    </div>
  )
}

export default Profile