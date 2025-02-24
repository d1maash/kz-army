"use client"

const AdminPage = () => {
  return (
    <div>
        <form action="#">
            <input 
              type="text"
              placeholder="Поиск" 
              className="w-full p-3 pl-10 rounded-xl bg-[#F7F7F7]"
              style={{
                backgroundImage: "url('/icons/search.svg')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "10px center", 
                backgroundSize: "20px 20px", 
            }}
            />

        </form>

        <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 h-36 bg-white shadow-lg rounded-xl">
                <h2 className="font-bold text-5xl">120</h2>
                <p className="mt-2">Общее количество заявок</p>
            </div>
            <div className="p-4 h-36 bg-white shadow-lg rounded-xl">
                <h2 className="font-bold text-5xl">120</h2>
                <p className="mt-2">ОАктивные заявки</p>
            </div>
            <div className="p-4 h-36 bg-white shadow-lg rounded-xl">
                <h2 className="font-bold text-5xl">120</h2>
                <p className="mt-2">Одобренные заявки</p>
            </div>
            <div className="p-4 h-36 bg-white shadow-lg rounded-xl">
                <h2 className="font-bold text-5xl">120</h2>
                <p className="mt-2">Отклонённые заявки</p>
            </div>

        </div>

        <div className="flex justify-between">
              <div className="flex flex-col bg-white shadow-lg">

              </div>
        </div>
    </div>
  )
}

export default AdminPage