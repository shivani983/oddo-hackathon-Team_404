import React, { useEffect, useState } from "react";

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items/all")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Browse All Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded shadow p-4">
            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p>{item.description}</p>
            <p className="text-sm text-gray-500">By: {item.uploader.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;