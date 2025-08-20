"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type SaleData = { date: string; totalAmount: number };

export default function WeeklySalesAmount() {
  const [data, setData] = useState<SaleData[]>([]);
  const [totalWeekly, setTotalWeekly] = useState(0);

  useEffect(() => {
    fetch("/api/sale/weeklyAmount")
      .then(res => res.json())
      .then((res: SaleData[]) => {
        setData(res);
        const total = res.reduce((sum, item) => sum + item.totalAmount, 0);
        setTotalWeekly(total);
      })
      .catch(console.error);
  }, []);

  const chartData = {
    labels: data.map(d => {
      const day = new Date(d.date).toLocaleDateString("en-US", { weekday: "long" });
      return `${day} ($${d.totalAmount})`;
    }),
    datasets: [
      {
        label: "Total Sales ($)",
        data: data.map(d => d.totalAmount),
        backgroundColor: [
          "#3b82f6",
          "#f97316",
          "#10b981",
          "#f43f5e",
          "#8b5cf6",
          "#facc15",
          "#06b6d4",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" as const },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `$${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
  <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl shadow-md">
      <h2 className="text-left mb-4 text-gray-700 text-lg font-semibold ">
        Weekly Sales Amount
      </h2>

      {/* ✅ Total sales card */}
      <div className="  text-center">
        <p className="text-black ">Total Weekly Sales : <span className=" font-bold text-blue-600">
          ${totalWeekly.toLocaleString()}
        </span></p>
       
      </div>

      {/* Chart */}
      <div className="w-full h-64 mx-auto">
        <Pie data={chartData} options={options} height={200} />
      </div>
    </div>
  );
}
