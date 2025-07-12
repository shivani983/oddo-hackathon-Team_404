import React, { useState } from "react";

const UploadItem = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    size: "",
    condition: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("size", form.size);
    data.append("condition", form.condition);
    data.append("image", image);

    const res = await fetch("http://localhost:5000/api/items/upload", {
      method: "POST",
      headers: { Authorization: token },
      body: data
    });

    const result = await res.json();
    if (res.ok) alert("Item uploaded!");
    else alert(result.message || "Upload failed");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" onChange={handleChange} placeholder="Title" className="w-full border p-2" required />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full border p-2" />
        <input name="size" onChange={handleChange} placeholder="Size (e.g. M, L)" className="w-full border p-2" />
        <input name="condition" onChange={handleChange} placeholder="Condition (e.g. Like New)" className="w-full border p-2" />
        <input type="file" onChange={handleFileChange} accept="image/*" className="w-full" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default UploadItem;
