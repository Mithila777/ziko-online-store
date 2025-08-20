"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type SaleData = { date: string; total: number };

export default function WeeklySalesQuantity() {
  const [data, setData] = useState<SaleData[]>([]);

  useEffect(() => {
    fetch("/api/sale/weeklyQuantity")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const totalSold = data.reduce((sum, d) => sum + d.total, 0);

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: "Items Sold",
        data: data.map(d => d.total),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
    },
  };

  return (
  <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl shadow-md">
      <h2 className="text-left mb-4 text-gray-700 text-lg font-semibold">
        Weekly Products Sale
      </h2>

      {/* ✅ Styled total card */}
      <div className=" text-center">
        <p className="text-black">Total Products Sold:  <span className=" font-bold text-blue-600">
          {totalSold.toLocaleString()}
        </span></p>
       
      </div>

      <div className="w-full h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
