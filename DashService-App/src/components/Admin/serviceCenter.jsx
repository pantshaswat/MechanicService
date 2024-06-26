// Users.js
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar";

const ServiceCenter = () => {
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

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Full Name", accessor: "fullName" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Actions",
        accessor: "hello",
        Cell: ({ value }) => (
          <>
            <Link to={`/users/edit/${value}`} className="btn btn-primary btn-sm mr-2">
              Edit
            </Link>
            <Link to={`/users/delete/${value}`} className="btn btn-danger btn-sm">
              Delete
            </Link>
          </>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: users,
  });

  return (
      <div className="container mx-auto mt-8 p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <Link to="/users/new" className="btn btn-primary">
          Add User
        </Link>
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

export default ServiceCenter;
