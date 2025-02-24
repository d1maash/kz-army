import Image from "next/image"

const AdminApplication = () => {
  return (
    <div>
      <div className="flex justify-between gap-3">
        <form action="#" className="w-full">
              <input 
                type="text"
                placeholder="Поиск" 
                className="w-full p-3 pl-10 shadow-sm rounded-xl bg-[#F7F7F7]"
                style={{
                  backgroundImage: "url('/icons/search.svg')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "10px center", 
                  backgroundSize: "20px 20px", 
              }}
            />
          </form>
          <button className="flex justify-center gap-3 items-center font-medium bg-custom-yellow rounded-xl p-3 px-6">
            Печать 
            <Image 
              src="/icons/download-file.svg"
              alt="download"
              width={16}
              height={16}
            />
          </button>
      </div>
    </div>
  )
}

export default AdminApplication