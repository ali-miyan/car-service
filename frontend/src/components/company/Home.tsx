import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";
import { getInitialToken } from "../../helpers/getToken";
import { useGetMonthlyRevenueQuery } from "../../store/slices/orderApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Dashboard = () => {
  const companyId = getInitialToken("companyToken");
  const { data: revenue = [] } = useGetMonthlyRevenueQuery(companyId as string);

  const revenueData = months.map((_, i) => {
    const item = revenue.find(
      ({ month }: { month: string }) => new Date(month).getMonth() === i
    );
    return item ? parseFloat(item.totalRevenue) : 0;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueData,
        fill: false,
        borderColor: "#ab0000",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: ({ raw }) => `Revenue: $${raw}`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bai-bold text-center font-semibold">
          Dashboard
        </h1>
      </header>
      <main className="flex flex-col w-full gap-6 lg:flex-row lg:gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <div className="h-80">
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          {[
            { title: "Total Revenue", value: "$32,000" },
            { title: "New Customers", value: "150" },
            { title: "Active Users", value: "1,200" },
          ].map(({ title, value }) => (
            <div key={title} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      </main>
      <section className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {[
            { user: "User John Doe", action: "Purchased Product X" },
            { user: "User Jane Smith", action: "Subscribed to Plan Y" },
            { user: "System", action: "Generated Report A" },
          ].map(({ user, action }) => (
            <li
              key={user}
              className="flex items-center justify-between border-b pb-2"
            >
              <span className="font-medium">{user}</span>
              <span className="text-gray-600">{action}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Detailed Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Date", "Revenue", "Customers", "Status"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  date: "2024-08-01",
                  revenue: "$5,000",
                  customers: "20",
                  status: "Completed",
                },
                {
                  date: "2024-08-02",
                  revenue: "$6,000",
                  customers: "25",
                  status: "Pending",
                },
              ].map(({ date, revenue, customers, status }) => (
                <tr key={date}>
                  <td className="px-6 py-4 whitespace-nowrap">{date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{revenue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customers}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
