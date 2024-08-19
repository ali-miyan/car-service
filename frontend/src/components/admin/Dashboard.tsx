import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [4000, 4500, 3000, 5000, 6000, 7000, 6500],
        fill: false,
        borderColor: '#4A90E2',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Revenue: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </header>
      <main className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        {/* Graph Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <div className="h-80">
            <Line data={data} options={options} />
          </div>
        </div>
        {/* Summary Metrics Section */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Total Revenue</h3>
            <p className="text-2xl font-bold">$32,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">New Customers</h3>
            <p className="text-2xl font-bold">150</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Active Users</h3>
            <p className="text-2xl font-bold">1,200</p>
          </div>
        </div>
      </main>
      {/* Recent Activity Section */}
      <section className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">User John Doe</span>
            <span className="text-gray-600">Purchased Product X</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">User Jane Smith</span>
            <span className="text-gray-600">Subscribed to Plan Y</span>
          </li>
          <li className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">System</span>
            <span className="text-gray-600">Generated Report A</span>
          </li>
        </ul>
      </section>
      {/* Detailed Data Table Section */}
      <section className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Detailed Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2024-08-01</td>
                <td className="px-6 py-4 whitespace-nowrap">$5,000</td>
                <td className="px-6 py-4 whitespace-nowrap">20</td>
                <td className="px-6 py-4 whitespace-nowrap">Completed</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2024-08-02</td>
                <td className="px-6 py-4 whitespace-nowrap">$6,000</td>
                <td className="px-6 py-4 whitespace-nowrap">25</td>
                <td className="px-6 py-4 whitespace-nowrap">Pending</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
