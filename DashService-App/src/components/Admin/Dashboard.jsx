import React, { useState,useMemo, useEffect } from 'react';
import axios from 'axios';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import { useTable } from "react-table";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalParts, setTotalParts] = useState(0);
  
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/count');
        const { totalCustomers, totalVendors, totalBookings, totalParts } = response.data;
        setTotalCustomers(totalCustomers);
        setTotalVendors(totalVendors);
        setTotalBookings(totalBookings);
        setTotalParts(totalParts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/appointments/view', {withCredentials: true});
        console.log(response.data.bookings)
        setServiceRequests(response.data.bookings);
      } catch (error) {
        console.error('Error fetching service requests:', error);
      }
    };

    fetchServiceRequests();
  }, []);
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Description", accessor: "description" },
      { Header: "User", accessor: "userId.fullName" },
      { Header: "User Contact", accessor: "userId.phoneNumber[0]" },
      { Header: "Vehicle", accessor: "vehicleId.make" },
      { Header: "Model", accessor: "vehicleId.model" },
      { Header: "Booking Schedule", accessor: "bookingSchedule" },
      { Header: "Status", accessor: "status" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: serviceRequests,
  });
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
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
            <IoPeople className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Bookings</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">{totalBookings}</strong>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-purple-500">
            <IoCart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Parts</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">{totalParts}</strong>
            </div>
          </div>
        </BoxWrapper>
      </div>

      <div className="container mx-auto mt-8 p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Bookings</h2>
        
      </div>

      <table className="table-auto w-full border-collapse border">
        <thead className="bg-gray-800 text-white">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="py-2 px-4 border">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="py-2 px-4 border">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}

function BoxWrapper({ children }) {
  return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}
