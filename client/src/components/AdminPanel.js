import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/api/items/admin/items", {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setItems(data);

    const statRes = await fetch("http://localhost:5000/api/items/admin/stats", {
      headers: { Authorization: token },
    });
    const statData = await statRes.json();
    setStats(statData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveItem = async (id) => {
    await fetch(`http://localhost:5000/api/items/admin/items/approve/${id}`, {
      method: "PATCH",
      headers: { Authorization: token },
    });
    fetchData();
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/api/items/admin/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">🛡️ Admin Panel</h2>

      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">📊 Swap Stats</h3>
        <p>Total Requests: {stats.total}</p>
        <p>Pending: {stats.pending}</p>
        <p>Accepted: {stats.accepted}</p>
        <p>Completed: {stats.completed}</p>
      </div>

      <h3 className="text-xl font-bold mb-4">🧾 Uploaded Items</h3>
      {items.length === 0 ? (
        <p>No items uploaded yet.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="border p-4 rounded mb-3">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <p>
              <strong>{item.title}</strong> by {item.uploader?.name || "Unknown"}
            </p>
            <p>{item.description}</p>
            {!item.approved ? (
              <>
                <button
                  onClick={() => approveItem(item._id)}
                  className="mr-2 bg-green-600 text-white px-3 py-1 rounded mt-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded mt-2"
                >
                  Delete
                </button>
              </>
            ) : (
              <p className="text-green-600 mt-2">Approved ✅</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPanel;
