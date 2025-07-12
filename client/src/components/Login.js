import React, { useState } from "react";

const Login = ({ onSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      if (onSuccess) onSuccess(); // Trigger re-render in App.js
    } else {
      alert(data.msg || data.errors?.[0]?.msg || "Login failed");
    }
  };

  return (
    <div className="max-w-sm p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full border p-2" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
