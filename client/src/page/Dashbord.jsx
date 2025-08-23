import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import InfoCard from '../component/InfoCard';

export default function Dashbord() {
  const [error, setError] = useState(null);
  const [numberSale, setNumberSale] = useState(0);
  const [numberOffer, setNumberOffer] = useState(0);
  const [numberRent, setNumberRent] = useState(0);
  const [numberUser, setNumberUser] = useState(0);
  const [numberSeller, setNumberSeller] = useState(0);
  const [numberAdmin, setNumberAdmin] = useState(0);

  useEffect(() => {
    const sellerNumber = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setNumberSale(data.length);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    // ✅ actually call the function
    sellerNumber();
  }, []);

  useEffect(() => {
    const sellerNumber = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setNumberOffer(data.length);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    // ✅ actually call the function
    sellerNumber();
  }, []);

  useEffect(() => {
    const sellerNumber = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setNumberRent(data.length);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    // ✅ actually call the function
    sellerNumber();
  }, []);

  useEffect(()=>{
       const GetAllUser = async () =>{
            try{
             const res = await fetch("/api/adminWork/getUSer");
             const data = await res.json();
             if(data.succuss === false){
              setError(data.mess)
             }else{
              setNumberAdmin(data.filter((u) => u.role === "admin").length);
              setNumberSeller(data.filter((u) => u.role === "seller").length);
              setNumberUser(data.filter((u) => u.role === "user").length);
              }
             //  console.log(data)
             // setAllUser(data);
            }catch(err){
              setError(err);
            }
       }
       GetAllUser();
   },[]);


  return (
    <div className="flex gap-4 p-4  flex-wrap justify-around">
          <InfoCard title="Users" number={120} color="#4ade80" /> {/* Green */}
          <InfoCard title="Sales" number={75} color="#60a5fa" />  {/* Blue */}
          <InfoCard title="Offers" number={30} color="#f87171" /> {/* Red */}
  </div>
  );
}
