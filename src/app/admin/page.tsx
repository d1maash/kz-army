"use client"

import CustomPieChart from "@/components/admin/CustomPieChart";
import LineChart from "@/components/admin/LineChart";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [applications, setApplications] = useState({ count: 0, results: [] });
  const pageSize = 20; // Should match your backend's default page size

  const fetchAllApplications = async (token: string) => {
    let allResults: any[] = [];
    let currentPage = 1;
    let totalCount = 0;

    try {
      while (true) {
        const response = await api.getApplications(token, currentPage, pageSize);
        allResults = [...allResults, ...response.results];
        totalCount = response.count;
        
        if (!response.next) break; // Stop if no more pages
        currentPage++;
      }
      
      return { count: totalCount, results: allResults };
    } catch (error) {
      console.error("Error fetching applications:", error);
      return { count: 0, results: [] };
    }
  };

  const handleApplications = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const data = await fetchAllApplications(token);
      setApplications(data);
    } else {
      console.error("Authorization required");
    }
  };

  useEffect(() => {
    handleApplications();
  }, []);

  // Calculate statistics from complete dataset
  const inReviewCount = applications.results.filter(app => app.status === "in_review").length;
  const acceptedCount = applications.results.filter(app => app.status === "approved").length;
  const rejectedCount = applications.results.filter(app => app.status === "rejected").length;

  return (
    <div>
        <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 h-36 bg-white shadow-lg rounded-xl">
                <h2 className="font-bold text-5xl">{applications.count}</h2>
                <p className="mt-2">Общее количество заявок</p>
            </div>
            <div className="p-4 h-36 bg-white shadow-lg rounded-xl">
                <h2 className="font-bold text-5xl">{inReviewCount}</h2>
                <p className="mt-2">Активные заявки</p>
            </div>
            <div className="p-4 h-36 bg-white shadow-lg rounded-xl">
                <h2 className="font-bold text-5xl">{acceptedCount}</h2>
                <p className="mt-2">Одобренные заявки</p>
            </div>
            <div className="p-4 h-36 bg-white shadow-lg rounded-xl">
                <h2 className="font-bold text-5xl">{rejectedCount}</h2>
                <p className="mt-2">Отклонённые заявки</p>
            </div>

        </div>

        <div className="flex justify-between flex-wrap md:flex-nowrap mt-6 gap-6">
              {/* CHART PIE */}
              <div className="flex flex-col rounded-xl p-5 w-full md:w-1/3 min-h-56 bg-white shadow-lg">
                  <h1 className="font-bold">Диаграмма заявок</h1>
                  <CustomPieChart accepted={acceptedCount} rejected={rejectedCount} />
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