import React, { useEffect, useState } from "react";

const SwapRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/items/requests/incoming", {
        headers: { Authorization: token }
      });
      const data = await res.json();
      setRequests(data);
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    const token = localStorage.getItem("token");
    const res = await fetch(http://localhost:5000/api/items/swap/${id}, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    alert(data.msg);
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Incoming Swap Requests</h2>
      {requests.map((r) => (
        <div key={r._id} className="border p-4 rounded mb-3">
          <p><strong>Item:</strong> {r.item.title}</p>
          <p><strong>From:</strong> {r.requester.name} ({r.requester.email})</p>
          <div className="mt-2 space-x-2">
            <button onClick={() => handleAction(r._id, "accepted")} className="bg-green-600 text-white px-3 py-1 rounded">
              Accept
            </button>
            <button onClick={() => handleAction(r._id, "rejected")} className="bg-red-600 text-white px-3 py-1 rounded">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwapRequests;