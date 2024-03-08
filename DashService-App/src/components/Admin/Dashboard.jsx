import React, { useState, useEffect } from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import axios from 'axios';

export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalApprovals, setTotalApprovals] = useState(0);
  const [totalPendings, setTotalPendings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/count'); // Replace YOUR_PORT with your actual port
          const { totalCustomers, totalVendors, totalApprovals, totalPendings } = response.data;
          console.log(response.data)

        setTotalCustomers(totalCustomers);
        setTotalVendors(totalVendors);
        setTotalApprovals(totalApprovals);
        setTotalPendings(totalPendings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Customers</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">{totalCustomers}</strong>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
            <IoPieChart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Vendors</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">{totalVendors}</strong>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
            <IoPeople className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Approvals</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">{totalApprovals}</strong>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
            <IoCart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Pendings</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">{totalPendings}</strong>
            </div>
          </div>
        </BoxWrapper>
      </div>
    </div>
  );
}

function BoxWrapper({ children }) {
  return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}
