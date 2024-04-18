import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/getAllUsers");
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Invalid data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserDelete = async({_id})=>{
    try {
      await axios.delete(`http://localhost:3000/auth/delete/${_id}`, {withCredentials: true});
      console.log('user deleted successfully');
      // Instead of reloading the window, consider updating the state or refetching users.
    } catch (error) {
      console.error(error);
    }
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Full Name", accessor: "fullName" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      // {
      //   Header: "Actions",
      //   accessor: "hello",
      //   Cell: ({ row }) => (
      //     <>
      //       <button onClick={()=> {
      //         const _id = row.original._id;
      //         handleUserDelete({_id: _id});
      //       }} className="btn btn-danger btn-sm">
      //         Delete
      //       </button>
      //     </>
      //   ),
      // },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: users,
  });

  return (
    <div className="container mx-auto mt-8 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        
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
  );
};

export default Users;
