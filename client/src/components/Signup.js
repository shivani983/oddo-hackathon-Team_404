import React, { useState } from "react";

const Signup = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Signup successful!");
      if (onSuccess) onSuccess(); // Trigger re-render in App.js
    } else {
      alert(data.msg || data.errors?.[0]?.msg || "Signup failed");
    }
  };

  return (
    <div className="max-w-sm p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" onChange={handleChange} placeholder="Name" className="w-full border p-2" required />
        <input name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full border p-2" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Signup;
