import React, { useEffect, useState } from "react";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/items/my-requests", {
      headers: { Authorization: token }
    })
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Swap Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No swap requests made.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white rounded shadow p-4">
              <img src={req.item.imageUrl} alt={req.item.title} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="font-bold text-lg">{req.item.title}</h3>
              <p className="text-sm text-gray-500">Status: {req.status}</p>
              <p className="text-sm">Uploaded By: {req.item.uploader?.name || "Unknown"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;