"use client"

import CustomPieChart from "@/components/admin/CustomPieChart";
import LineChart from "@/components/admin/LineChart";

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
                <p className="mt-2">Активные заявки</p>
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

        <div className="flex justify-between flex-wrap md:flex-nowrap mt-6 gap-6">
              {/* CHART PIE */}
              <div className="flex flex-col rounded-xl p-5 w-full md:w-1/3 min-h-56 bg-white shadow-lg">
                  <h1 className="font-bold">Диаграмма заявок</h1>
                  <CustomPieChart accepted={5} rejected={15} />
                  <div className="flex items-center mt-6 gap-3">
                      <div className="bg-[#C8C8C8] w-3 h-3 rounded-full"></div>
                      <p>Одобренные</p>
                  </div>
                  <div className="flex items-center mt-6 gap-3">
                    <div className="bg-custom-yellow w-3 h-3 rounded-full"></div>
                    <p>Отклоненные</p>
                  </div>
              </div>

              {/* STATISTIC */}
              <div className="bg-white shadow-lg rounded-xl min-h-53 w-full">
                  <LineChart />
              </div>
        </div>
    </div>
  )
}

export default AdminPage