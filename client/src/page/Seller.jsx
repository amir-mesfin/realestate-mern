import React, {useState} from 'react'
import CreateListing from './CreateListing';
import SellerUpdate from './SellerUpdate'
import ShowListing from './ShowListing'


export default function Seller() {
const [activePage, setActivePage] = useState("show");

const menuItems = [
    { label: "show List", key: "show" },
    { label: "Create List", key: "createList" },
    { label: "update List", key: "update" },
  ];
  return (
    <div>
        <div className="flex flex-col md:flex-row gap-4  my-4 px-2 md:px-4 min-h-[80vh]">
    {/* Left Sidebar */}
    <div className="w-full md:w-1/5  bg-white rounded-xl shadow-sm overflow-y-auto  md:h-auto">
      <ul className="flex md:flex-col justify-around  md:justify-between  md:gap-20p  flex-row md:gap-6 gap-2 p-2 md:p-4">
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`p-2 md:p-3 text-sm md:text-lg font-semibold whitespace-nowrap rounded-xl cursor-pointer transition 
            ${
              activePage === item.key
                ? "bg-green-500 text-white"
                : "bg-blue-100 hover:bg-green-300 hover:text-white"
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
      {activePage === "createList" && <CreateListing />}
      {activePage === "show" && <ShowListing />}
      {activePage === "update" && <SellerUpdate />}
     
    </div>

  </div>
    </div>
  )
}
