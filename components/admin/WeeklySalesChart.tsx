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

export default function WeeklySalesChart() {
  const [data, setData] = useState<SaleData[]>([]);

  useEffect(() => {
    fetch("/api/sale/weeklyQuantity")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

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
      title: { display: true, text: "Weekly Products sale" },
    },
  };

  return <Bar data={chartData} options={options} />;
}
