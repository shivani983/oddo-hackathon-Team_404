import React, { useEffect, useState } from "react";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/items/all")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleRequestSwap = async (itemId) => {
    try {
      const res = await fetch(http://localhost:5000/api/items/swap/${itemId}, {
        method: "POST",
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      alert(data.msg || "Request sent");
    } catch (err) {
      alert("Error sending swap request");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Browse All Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded shadow p-4">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p>{item.description}</p>
            <p className="text-sm text-gray-500">By: {item.uploader.name}</p>

            {/* ✅ Show swap button only if logged in */}
            {token && (
              <button
                onClick={() => handleRequestSwap(item._id)}
                className="mt-3 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded w-full transition"
              >
                Request Swap
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;