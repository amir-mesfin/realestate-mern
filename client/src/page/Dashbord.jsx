import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import InfoCard from '../component/InfoCard';
import './clamp.css';
export default function Dashboard() {
  const [error, setError] = useState(null);
  const [numberSale, setNumberSale] = useState(0);
  const [numberOffer, setNumberOffer] = useState(0);
  const [numberRent, setNumberRent] = useState(0);
  const [numberUser, setNumberUser] = useState(0);
  const [numberSeller, setNumberSeller] = useState(0);
  const [numberAdmin, setNumberAdmin] = useState(0);
  const [recentListings, setRecentListings] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sale listings
        const saleRes = await fetch(`/api/listing/get?type=sale`);
        const saleData = await saleRes.json();
        if (saleData.success === false) setError(saleData.message);
        else setNumberSale(saleData.length);

        // Fetch offer listings
        const offerRes = await fetch(`/api/listing/get?offer=true`);
        const offerData = await offerRes.json();
        if (offerData.success === false) setError(offerData.message);
        else setNumberOffer(offerData.length);

        // Fetch rent listings
        const rentRes = await fetch(`/api/listing/get?type=rent`);
        const rentData = await rentRes.json();
        if (rentData.success === false) setError(rentData.message);
        else setNumberRent(rentData.length);

        // Fetch users
        const userRes = await fetch("/api/adminWork/getUSer");
        const userData = await userRes.json();
        if (userData.success === false) setError(userData.message);
        else {
          setNumberAdmin(userData.filter((u) => u.role === "admin").length);
          setNumberSeller(userData.filter((u) => u.role === "seller").length);
          setNumberUser(userData.filter((u) => u.role === "user").length);
        }

        // Fetch recent listings
        const recentRes = await fetch("/api/listing/get?limit=5&sort=createdAt");
        const recentData = await recentRes.json();
        if (recentData.success === false) setError(recentData.message);
        else setRecentListings(recentData);

        // Fetch monthly data for charts
        const monthlyRes = await fetch("/api/listing/getMonthlyData");
        const monthlyData = await monthlyRes.json();
        if (monthlyData.success === false) setError(monthlyData.message);
        else setMonthlyData(monthlyData);

      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchData();
  }, []);

  // Data for pie chart (user distribution)
  const userDistributionData = [
    { name: 'Customers', value: numberUser },
    { name: 'Real Estate Owners', value: numberSeller },
    { name: 'Agents', value: numberAdmin },
  ];

  // Data for bar chart (property distribution)
  const propertyData = [
    { name: 'For Sale', value: numberSale },
    { name: 'For Rent', value: numberRent },
    { name: 'With Offer', value: numberOffer },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to your Real Estate Management System
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="flex gap-4 p-4  flex-wrap justify-around 2xl:mt-20">
          <InfoCard title="Total Customers" number={numberUser} color="#4f46e5" />
          <InfoCard title="Real Estate Owners" number={numberSeller} color="#10b981" />
          <InfoCard title="Properties for Sale" number={numberSale} color="#f59e0b" />
          <InfoCard title="Properties for Rent" number={numberRent} color="#ef4444" />
          <InfoCard title="System Agents" number={numberAdmin} color="#8b5cf6" />
          <InfoCard title="Properties with Offers" number={numberOffer} color="#ec4899" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">User Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {userDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Distribution Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Property Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propertyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Activity Area Chart */}
        {monthlyData.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Activity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="listings" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Recent Listings */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Listings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Latest properties added to the system
        </p>
      </div>

      {/* Listings */}
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {recentListings.length > 0 ? (
            recentListings.map((listing) => (
              <li key={listing._id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition">
                  {/* Top row: name + badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-indigo-600 truncate max-w-full sm:max-w-sm">
                      {listing.name}
                    </p>
                    <span className="mt-2 sm:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {listing.type}
                    </span>
                  </div>

                  {/* Description + Date */}
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-sm text-gray-500 clamp-2">
                      {listing.description}
                    </p>
                    <p className="text-sm text-gray-400 flex-shrink-0">
                      Added on {new Date(listing.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-5 sm:px-6">
              <p className="text-sm text-gray-500">No recent listings found.</p>
            </li>
          )}
        </ul>
      </div>
    </div>
      </div>
    </div>
  );
}