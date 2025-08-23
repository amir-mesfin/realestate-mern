import React, { useState } from "react";
import AddSeller from "./AddSeller";
import AddAdmin from "./AddAdmin";
import AllUser from "./AllUser";
import OfferRealState from './OfferRealState'
import { useSelector } from "react-redux";

export default function Dashborder() {
  const [activePage, setActivePage] = useState("Dashboard");
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          🚫 Access Denied — Admins Only
        </h1>
      </div>
    );
  }

  const menuItems = [
    { label: "Dashboard", key: "Dashboard" },
    { label: "User", key: "User" },
    { label: "Message", key: "message" },
    { label: "Offer Real_state", key: "offer" },
    { label: "Rent Real_state", key: "rent" },
    { label: "Sale Real_state", key: "sale" },
    { label: "Add admin", key: "add_admin" },
    { label: "Add Seller", key: "add_Seller" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 my-4 px-2 md:px-4 min-h-[80vh]">
    {/* Left Sidebar */}
    <div className="w-full md:w-1/5 bg-white rounded-xl shadow-sm overflow-y-auto  md:h-auto">
      <ul className="flex md:flex-col flex-row md:gap-6 gap-2 p-2 md:p-4">
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`p-2 md:p-3 text-sm md:text-lg font-semibold whitespace-nowrap rounded-xl cursor-pointer transition 
            ${
              activePage === item.key
                ? "bg-blue-500 text-white"
                : "bg-blue-100 hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => setActivePage(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  
    {/* Main Content */}
    <div className="flex-1 w-full bg-slate-100 rounded-xl shadow-sm p-4 overflow-y-auto h-[80vh] md:h-[80vh]">
      {activePage === "add_Seller" && <AddSeller />}
      {activePage === "add_admin" && <AddAdmin />}
      {activePage === "sale" && <h1>💰 Sale Real State</h1>}
      {activePage === "rent" && <h1>🏢 Rent Real State</h1>}
      {activePage === "offer" && <OfferRealState />}
      {activePage === "message" && <h1>💬 Messages</h1>}
      {activePage === "Dashboard" && <h1>📊 Dashboard Overview</h1>}
      {activePage === "User" && <AllUser />}
    </div>
  
    {/* Right Sidebar */}
    <div className="hidden md:flex w-full md:w-1/5 bg-slate- rounded-xl shadow-sm py-3 px-4 flex-col justify-between">
      <div className="h-[400px] flex flex-col">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold text-slate-600">Top Agent</h2>
          <p className="text-slate-600">...</p>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <img
            src="http://res.cloudinary.com/de91zvrzu/image/upload/v1755390858/fmbw5k0za7akjpwavc1k.ico"
            alt=""
            className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm md:text-lg text-slate-700">name</p>
            <p className="text-xs md:text-sm text-slate-500">email</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
