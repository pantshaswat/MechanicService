// SquareCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SquareCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://your-nodejs-api.com/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-md shadow-md p-4 m-4">
      <h3 className="text-xl font-semibold mb-2">Square Card</h3>
      {data ? (
        <div className="flex items-center">
          <p>Data from Node.js:</p>
          {data.isSuccess ? (
            <span className="text-green-500 text-3xl ml-2">&#10003;</span>
          ) : (
            <span className="text-red-500 text-3xl ml-2">&#10007;</span>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SquareCard;
