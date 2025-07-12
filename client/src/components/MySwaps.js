import React, { useEffect, useState } from "react";

const MySwaps = () => {
  const token = localStorage.getItem("token");
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items/my-swaps", {
      headers: { Authorization: token }
    })
      .then((res) => res.json())
      .then((data) => {
        setSent(data.sent || []);
        setReceived(data.received || []);
      });
  }, []);

  const markCompleted = async (id) => {
<<<<<<< HEAD
    const res = await fetch(`http://localhost:5000/api/items/swap/complete/${id}`, {
=======
    const res = await fetch(http://localhost:5000/api/items/swap/complete/${id}, {
>>>>>>> 945cf8bc3d0cd803c370ac7135c2a848a613f65e
      method: "PATCH",
      headers: { Authorization: token },
    });
    const data = await res.json();
    alert(data.msg);
    window.location.reload();
  };

  const cancelSwap = async (id) => {
<<<<<<< HEAD
    const res = await fetch(`http://localhost:5000/api/items/swap/${id}`, {
=======
    const res = await fetch(http://localhost:5000/api/items/swap/${id}, {
>>>>>>> 945cf8bc3d0cd803c370ac7135c2a848a613f65e
      method: "DELETE",
      headers: { Authorization: token },
    });
    const data = await res.json();
    alert(data.msg);
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Swaps</h2>

      <h3 className="text-xl font-semibold mb-2">🧾 Sent Requests</h3>
      {sent.length === 0 ? (
        <p className="text-gray-500 mb-4">No requests sent.</p>
      ) : (
        sent.map((r) => (
          <div key={r._id} className="border p-4 rounded mb-3">
            <img src={r.item.imageUrl} alt={r.item.title} className="w-full h-40 object-cover mb-2 rounded" />
            <p><strong>Item:</strong> {r.item.title}</p>
            <p><strong>Status:</strong> {r.status}</p>
            {r.status === "pending" && (
              <button onClick={() => cancelSwap(r._id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
                Cancel Request
              </button>
            )}
          </div>
        ))
      )}

      <h3 className="text-xl font-semibold mt-6 mb-2">📥 Received & Ongoing</h3>
      {received.length === 0 ? (
        <p className="text-gray-500">No accepted/completed requests on your items.</p>
      ) : (
        received.map((r) => (
          <div key={r._id} className="border p-4 rounded mb-3">
            <img src={r.item.imageUrl} alt={r.item.title} className="w-full h-40 object-cover mb-2 rounded" />
            <p><strong>Item:</strong> {r.item.title}</p>
            <p><strong>Requester:</strong> {r.requester.name}</p>
            <p><strong>Status:</strong> {r.status}</p>
            {r.status === "accepted" && (
              <button onClick={() => markCompleted(r._id)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                Mark as Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

<<<<<<< HEAD
export default MySwaps;
=======
export default MySwaps;
>>>>>>> 945cf8bc3d0cd803c370ac7135c2a848a613f65e
