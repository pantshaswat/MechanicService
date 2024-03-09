// SquareCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SquareCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/serviceCenter/getAll", { withCredentials: true });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
   const handleApprove =async (id) => {
     // Implement the logic for approving a service center
     const response = await axios({
  method: 'put',
  url: `http://localhost:3000/serviceCenter/approve/${id}`,
  withCredentials: true
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
     


     console.log(`Approving service center with ID: ${id}`);
     
  };

  const handleReject = (id) => {
    // Implement the logic for rejecting a service center
    console.log(`Rejecting service center with ID: ${id}`);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 m-4">
      <h3 className="text-xl font-semibold mb-2">Square Card</h3>
      {data ? (
        <div>
          {data.
              filter((center) => center.status === "false").
            map((center) => (
            <div key={center._id} className="mb-4">
              <p>Service Center Name: {center.name}</p>
              <p>Location: {center.address}</p>
              <p>About: {center.about}</p>
              <p>Phone Number: {center.about}</p>



              {/* Add more details as needed */}
                <div className="flex mt-2">
                <button
                  onClick={() => handleApprove(center.ownerUserId)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(center.ownerUserId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Reject
                </button>
              </div>
            </div>
            ))}
                    {data.filter((center) => center.status === true).length === 0 && <p>No approved service centers found.</p>}

        </div>
      ) : (
        <p>No requests available...</p>
      )}
    </div>
  );
};

export default SquareCard;
